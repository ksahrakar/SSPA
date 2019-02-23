const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const moment = require("moment");

function resetSocDone () {
    for (i=0;i<socialization.length;i++){
        now=new Date();
        lastSoc = new Date(this.checkout);
        if (now.getDay()!==lastSoc.getDay()){
            this.socialization[i].done=false;
        }
    }
}

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
});

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;
