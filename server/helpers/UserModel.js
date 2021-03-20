const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Include your username"],
    // unique: 1,
    maxLength: 20
  },
  password: {
    type: String,
    required: [true, "Please Include your password"],
    minlength: 4
  },
  token: {
    type: String,
    // required: true
  },
  results: {
    type: Object
  }
})

userSchema.pre("save", async function(next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (err) {
    console.log(err)
  }
})

userSchema.methods.generateAuthToken = async function() {
  try {
    const user = this;
    const token = jwt.sign({ _id: user._id, username: user.username}, process.env.SECRET, { expiresIn:'20m'});
    user.token = token;
    await user.save();
    return token;
  } catch (err) {
    console.log(err)
  }
}

userSchema.statics.findByCredentials = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error({ error: "Invalid login details" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error({ error: "Invalid login details" })
    }
    return user;
  } catch (err) {
    console.log(err);
  }
}

userSchema.statics.isUsernameInUse = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err)
  }
}

const User = mongoose.model("User", userSchema);
module.exports = User;
