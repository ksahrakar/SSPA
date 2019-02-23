const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise


const staffSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    pic: String,
    email: {
        type: String,
        required: true
    },
    mobile: String,
    password: {
        type: String,
        required: true
    },
    notes: String,
    location: String,
    available: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false,
        required: true
    }
});

staffSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

staffSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('models/staff.js =======NO PASSWORD PROVIDED=======')
        next()
    } else {
        console.log('models/staff.js hashPassword in pre save');

        this.password = this.hashPassword(this.password)
        next()
    }
})

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
