const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const Staff = require('../models/staff')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	done(null, { _id: user._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((user, done) => {
	let id = user._id
	Staff.findById(id, function (err, user) {
		done(null, user)
	}
	)
})

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport
