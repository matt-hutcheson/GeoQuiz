const { findByIdAndUpdate } = require("./UserModel.js");
const User = require("./UserModel.js");
const bcrypt = require("bcrypt")

exports.registerNewUser = async (req, res) => {
  try {
    const username = req.body.username;
    const isUser = await User.isUsernameInUse(username);
    if (isUser) {
      return res.status(409).json({
        message: "username already in use"
      })
    }
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })
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
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
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
