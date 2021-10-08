const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  wishlist: [
    {
      title: String,
      description: String,
      urlToImage: String,
      content: String,
    },
  ],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
