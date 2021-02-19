const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Include your username"]
  },
  password: {
    type: String,
    required: [true, "Please Include your password"]
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  results: {
    type: Array
  }
})

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
})

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id, username: user.username, results: user.results}, "secret");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" })
  }
  return user;
}

userSchema.statics.isUsernameInUse = async (username) => {
  const user = await User.findOne({ username });
  if (!user) {
    return false;
  } else {
    return true;
  }
}

const User = mongoose.model("User", userSchema);
module.exports = User;
