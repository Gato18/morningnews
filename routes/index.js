require("dotenv").config();
var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var userModel = require("../models/users");

router.post("/addToWishlist", async function (req, res, next) {
  var article = JSON.parse(req.body.article);

  var wishlist = {
    title: article.title,
    description: article.description,
    content: article.content,
    urlToImage: article.urlToImage,
  };

  var newArticle = await userModel.findOneAndUpdate({ token: req.body.token }, { $push: { wishlist: wishlist } });

  var result = false;
  if (newArticle != null) {
    result = true;
  }
  res.json({ result });

  //avec le token, on va rajouter l'article dans le sous document de l'utilisateur
  //depuis le fetch on a les info dans le req.body
});

router.post("/deleteToWishlist", async function (req, res, next) {
  var del = await userModel.updateOne({ token: req.body.token }, { $pull: { wishlist: { title: req.body.title } } });
  var result = false;
  if (del.deletedCount == 1) {
    result = true;
  }
  res.json({ result });

  //avec le token, on va retirer l'article dans le sous document de l'utilisateur
});

router.post("/loadWishlist", async function (req, res, next) {
  console.log("token", req.body.token);

  var loadWish = await userModel.find({ token: req.body.token });
  console.log("loadWish", loadWish);

  //var result = false;
  //if (del.deletedCount == 1) {
  // result = true;
  //}
  res.json({ result: loadWish[0].wishlist });

  //avec le token, on va retirer l'article dans le sous document de l'utilisateur
});

router.post("/sign-up", async function (req, res, next) {
  var error = [];
  var result = false;
  var saveUser = null;
  var token = null;

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (data != null) {
    error.push("utilisateur déjà présent");
  }

  if (req.body.usernameFromFront == "" || req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32),
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }

  res.json({ result, saveUser, error, token });
});

router.post("/sign-in", async function (req, res, next) {
  var result = false;
  var user = null;
  var error = [];
  var token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    error.push("champs vides");
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        error.push("mot de passe incorrect");
      }
    } else {
      error.push("email incorrect");
    }
  }

  res.json({ result, user, error, token });
});

module.exports = router;
