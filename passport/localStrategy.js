const Staff = require('../models/staff')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		emailField: 'email' // not necessary, DEFAULT
	},
	function (email, password, done) {
		Staff.findOne({ email: email }, (err, staff) => {
			if (err) {
				return done(err)
			}
			if (!staff) {
				return done(null, false, { message: 'Incorrect email' })
			}
			if (!staff.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, staff)
		})
	}
)

module.exports = strategy
