const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const moment = require("moment");

const dogSchema = new Schema({
    name: String,
    pic: String,
    kennel: Number,
    shelterID: String,
    intakeDate: {
        type: Date,
    },
    description: String,
    playStyle: String,
    active: {
        type: Boolean,
        default: true
    },
    checkout: Date,
    location: {
        type: String,
        default: "Kennel",
        required: true
    },
    notes: String,
    socialization: [
        {
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            ampm: {
                type: String,
                required: true
            },
            done: {
                type: Boolean,
                required: true,
                default: false
            },
            inprogress: {
                type: Boolean,
                default: false
            }
        }
    ],
    socTime:[
        {
            date:{
                type: Date
            }
        },
        {
            minutes:{
                type: Number
            }
        }
    ]
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
