const User = require("./UserModel.js");

exports.registerNewUser = async (req, res) => {
  try {
    // if (isUser.length >= 1) {
    //   return res.status(409).json({
    //     message: "username already in use"
    //   })
    // }
    const user = new User({
      name: req.body.name,
      password: req.body.password
    })
    let data = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.loginUser = async (req, res) => {};
exports.getUserDetails = async (req, res) => {};
