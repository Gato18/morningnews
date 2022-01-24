var mongoose = require("mongoose");

var options = { connectTimeoutMS: 5000, useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect("mongodb+srv://" + process.env.USER + ":" + process.env.PASSWORD + "@" + process.env.SERVER + "/" + process.env.BDDNAME + "?retryWrites=true&w=majority", options, function (error) {
  if (error == null) {
    console.log("Connexion réussie");
  } else {
    console.log(error);
  }
});
