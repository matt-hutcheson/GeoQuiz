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
        message: "username already in use"
      })
    }
    const user = new User(req.body)
    let data = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res.status(401).json({ error: "Login failed! Check authentication credentials" });
    }
    const accessToken = await user.generateAuthToken();
    console.log("here");
    const refreshToken = jwt.sign( { _id: user._id, username: user.username, results: user.results}, process.env.REFRESHSECRET );
    refreshTokens.push(refreshToken);
    res.status(201).json({ user, accessToken, refreshToken });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.refreshToken = async (req,res) => {
  try {
    const {token} = req.body;
    if (!token) {
      return res.sendStatus(401);
    }
    if (!refreshTokens.includes(token)) {
      return res.sendStatus(403);
    }
    jwt.verify(token, process.env.REFRESHSECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign({ _id: user._id, username: user.username, results: user.results}, process.env.SECRET, { expiresIn:'60m'});
      res.status(201).json({accessToken});
    })
  } catch (err) {
    res.status(400).json({err: err});
  }
};
exports.logoutUser = async (req,res) => {
  try {
    const {token} = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);
    res.send("Logout successful");
  } catch (err) {
    console.log(err)
    res.status(400).json({err:err});
  }
};
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (!user) {
      return res.status(500).send({ message: "user not found", id: req.body._id })
    }
    res.status(200).json({ user })
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
exports.updateUserDetails = async (req, res) => {
  try {
    const { _id, username, results} = req.body;
    const password = await bcrypt.hash(req.body.password, 8);
    await User.findByIdAndUpdate(_id, {username, password, results}, {new: true}, function(err, user) {
      if (err) {
        res.status(500).send({ err: err })
      }
      if (user) {
        res.status(200).send(user)
      } else {
        res.status(500).send({ message: "Update failed. User not found", id: _id})
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.body._id, function(err, user){
      if (err) {
        res.status(500).send({ err: err })
      }
      if (user) {
        res.status(200).send({ message: "User successfully deleted", id: req.body._id })
      } else {
        res.status(500).send({ message: "Delete failed. User not found" });
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
}
