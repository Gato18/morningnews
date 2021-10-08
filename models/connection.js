var mongoose = require("mongoose");

var user = "Capsule";
var password = "mkQTRQcuKn2tOvay";
var server = "cluster0.qnjdh.mongodb.net";
var bddname = "morningnews";

var options = { connectTimeoutMS: 5000, useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect("mongodb+srv://" + user + ":" + password + "@" + server + "/" + bddname + "?retryWrites=true&w=majority", options, function (error) {
  if (error == null) {
    console.log("Connexion réussie");
  } else {
    console.log(error);
  }
});
