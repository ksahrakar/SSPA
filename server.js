const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

//Authentication Packages
const session = require("express-session");
const passport = require("./passport");


//route requires
const routes = require("./routes");

//Middleware here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}


//sessions
app.use(
	session({
		secret: 'carolinekamran', //pick a random string to make the hash that is generated securer
		resave: false,
		saveUninitialized: false,
	})
)
// passport
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dogSocialization");


// Start the API server
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
