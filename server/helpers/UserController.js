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
    return res.status(400).json({ err: err, status:400 });
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
    return res.status(400).json({ err: err, status:400 });
  }
};
exports.refreshToken = async (req,res) => {
  try {
    const refreshToken = req.headers.authorization.replace("Bearer ", "");
    if (!refreshToken) {
      return res.sendStatus(401);
    }
    if (!refreshTokens.includes(refreshToken)) {
      console.log("failed refresh")
      return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESHSECRET, (err, user) => {
      if (err) {
        console.log("failed verify")
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign({ _id: user._id, username: user.username}, process.env.SECRET, { expiresIn:'20m'});
      User.findByIdAndUpdate( user._id, {token: accessToken}, function(err, user){
        if (err) {
          return res.status(400).json({err: err, status:400})
        }
      })
      return res.status(201).json({accessToken: accessToken, status:201 });
    })
  } catch (err) {
    return res.status(400).json({err: err, status:400});
  }
};
exports.logoutUser = async (req,res) => {
  try {
    const {_id, token} = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    return res.status(200).send({ message: "logout successful", id: _id, status:200 })
  } catch (err) {
    console.log(err)
    return res.status(400).json({err:err, status:400});
  }
};
exports.checkAuthToken = (req, res) => {
  return res.status(200).json({status:200, message:"authenticated successfully", user:req.user})
};
exports.getUserDetails = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findById(_id, function(err, user){
      if (err) {
        return res.status(500).send({ message: "User not found", status:500})
      }
      if (user) {
        return res.status(200).send({ _id: user._id, username:user.username, results: user.results, status:200 });
      }
    })
  } catch (err) {
    return res.status(400).json({err:err, status:400});
  }
};
exports.updateUserDetails = async (req, res) => {
  try {
    const { _id, username, password, results} = req.body;
    let nameCheck;
    await User.findById(_id, function(err, result){
      if (err){
        return res.status(500).send({ message: "Update failed. User not found or bad request"})
      } else {
        nameCheck = result.username
      }
    })
    if (nameCheck){
      if (nameCheck !== username){
        const isUser = await User.isUsernameInUse(username);
        if (isUser) {
          return res.status(409).json({
            message: "username already in use",
            status:409
          })
        }
      }
    }
    if (password !== ""){
      password = await bcrypt.hash(req.body.password, 8);
      await User.findByIdAndUpdate(_id, {username, password, results}, {new: true}, async function(err, user) {
        if (err) {
          return res.status(500).send({ message: "Update failed. User not found or bad request.", err: err, status:500 })
        }
        if (user) {
          return res.status(200).send({_id: user._id, username: user.username, results: user.results, status:200})
        } else {
          return res.status(400).json({ err: err, status:400})
        }
      });
    } else {
      await User.findByIdAndUpdate(_id, {username, results}, {new: true}, async function(err, user) {
        if (err) {
          return res.status(500).send({ message: "Update failed. User not found or bad request.", err: err, status:500 })
        }
        if (user) {
          return res.status(200).send({_id: user._id, username: user.username, results: user.results, status:200})
        } else {
          return res.status(400).json({ err: err, status:400})
        }
      });
    }
  } catch (err) {
    return res.status(400).json({ err: err, status:400 });
  }
};
exports.updateUserResults = async (req, res) => {
  try {
    const { _id, results } = req.body;
    await User.findByIdAndUpdate(_id, {results}, {new: true}, async function( err, user) {
      if (err) {
        return res.status(500).send({ message: "Update results failed. User not found or bad request.", err: err, status:500})
      }
      if (user) {
        return res.status(200).send({_id: user._id, username: user.username, results: user.results, status:200})
      } else {
        return res.status(400).json({err: err, status:400})
      }
    })
  } catch (err) {
    return res.status(400).json({err: err, status:400})
  }
}
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.body._id, function(err, user){
      if (err) {
        return res.status(500).send({ err: err, status:500 })
      }
      if (user) {
        return res.status(200).send({ message: "User successfully deleted", id: req.body._id, status:200 })
      } else {
        return res.status(500).send({ message: "Delete failed. User not found", status:500 });
      }
    });
  } catch (err) {
    return res.status(400).json({ err: err, status:400 });
  }
}
