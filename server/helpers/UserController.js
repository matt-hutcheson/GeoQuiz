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
    return res.status(200).json({ user })
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.updateUserDetails = async (req, res) => {
  try {
    const { _id, username, results} = req.body;
    const password = await bcrypt.hash(req.body.password, 8)
    const user = await User.findByIdAndUpdate(_id, {username, password, results})
    const updatedUser = await User.findById(_id)
    console.log(updatedUser)
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send(err)
  }
};

