const { findByIdAndUpdate } = require("./UserModel.js");
const User = require("./UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

exports.registerNewUser = async (req, res) => {
  try {
    const username = req.body.username;
    const isUser = await User.isUsernameInUse(username);
    if (isUser) {
      return res.status(409).json({
        message: "username already in use",
        status:409
      })
    }
    const user = new User(req.body)
    let data = await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).json({ token: token, status: 201 });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res.status(401).json({ error: "Login failed! Check authentication credentials", status: 401 });
    }
    const accessToken = await user.generateAuthToken();
    const refreshToken = jwt.sign( { _id: user._id, username: user.username}, process.env.REFRESHSECRET );
    refreshTokens.push(refreshToken);
    user.password = "";
    user.token = "";
    return res.status(202).json({ user:user, accessToken:accessToken, refreshToken:refreshToken, status: 202 });
  } catch (err) {
    console.log(err)
    return res.status(400).json({ err: err });
  }
};
exports.refreshToken = async (req,res) => {
  try {
    const {refreshToken} = req.body;
    if (!refreshToken) {
      return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESHSECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign({ _id: user._id, username: user.username}, process.env.SECRET, { expiresIn:'60m'});
      User.findByIdAndUpdate( user._id, {token: accessToken}, function(err, user){
        if (err) {
          return res.status(400).json({err: err})
        }
      })
      return res.status(201).json({accessToken: accessToken});
    })
  } catch (err) {
    return res.status(400).json({err: err});
  }
};
exports.logoutUser = async (req,res) => {
  try {
    const {_id, token} = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    return res.status(200).send({ message: "logout successful", id: _id })
  } catch (err) {
    console.log(err)
    return res.status(400).json({err:err});
  }
};
exports.getUserDetails = (req, res) => {
  return res.status(200).send(req.user)
};
exports.updateUserDetails = async (req, res) => {
  try {
    const { _id, username, results} = req.body;
    const password = await bcrypt.hash(req.body.password, 8);
    await User.findByIdAndUpdate(_id, {username, password, results}, {new: true}, async function(err, user) {
      if (err) {
        return res.status(500).send({ message: "Update failed. User not found or bad request.", err: err })
      }
      if (user) {
        return res.status(200).send({_id: user._id, username: user.username, results: user.results})
      } else {
        return res.status(400).json({ err: err })
      }
    });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};
exports.updateUserResults = async (req, res) => {
  try {
    const { _id, results } = req.body;
    await User.findByIdAndUpdate(_id, {results}, {new: true}, async function( err, user) {
      if (err) {
        return res.status(500).send({ message: "Update results failed. User not found or bad request.", err: err})
      }
      if (user) {
        return res.status(200).send({_id: user._id, username: user.username, results: user.results})
      } else {
        return res.status(400).json({err: err})
      }
    })
  } catch (err) {
    return res.status(400).json({err: err})
  }
}
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.body._id, function(err, user){
      if (err) {
        return res.status(500).send({ err: err })
      }
      if (user) {
        return res.status(200).send({ message: "User successfully deleted", id: req.body._id })
      } else {
        return res.status(500).send({ message: "Delete failed. User not found" });
      }
    });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
}
