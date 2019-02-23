const mongoose = require("mongoose");
const db = require("../models");
//const moment= require ("moment");

// This file empties the Dogs collection and inserts the 5 dogs below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/dogSocialization"
);

const dogSeed = [
  {
    name: "Tennison",
    pic: "https://i.postimg.cc/kXx7dnd9/Tennison.jpg",
    kennel: 95,
    shelterID: "A754918",
    intakeDate: "2019-1-5",
    description: "male, brown & black German Shepherd Dog",
    playStyle: "W",
    active: true,
    notes: "no other dogs, will re-direct when walking in close proximity to dogs, approval needed to walk dog",
    socialization: [
      {
        name: "Walk",
        duration: 40,
        ampm: "am",
        done: false,
        inprogress: false

      },
      {
        name: "BRBreak",
        duration: 15,
        ampm: "pm",
        done: false,
        inprogress: false

      }
    ],
    checkout: new Date('2019/02/16 10:30'),
    location: "Kennel"
  },
  {
    name: "Harvey",
    pic: "https://i.postimg.cc/8CCGWMfP/Harvey.jpg",
    kennel: 16,
    shelterID: "A754995",
    intakeDate: "2019-1-7",
    description: "8 Yrs NEUTERED, black & white Siberian Husky mix",
    playStyle: "GD",
    active: true,
    notes: "gd, social",
    socialization: [
      {
        name: "Group",
        duration: 40,
        ampm: "am",
        done: false,
        inprogress: false

      },
      {
        name: "Group",
        duration: 40,
        ampm: "pm",
        done: false,
        inprogress: false

      }
    ],
    checkout: new Date('2019/02/16 10:30'),
    location: "Kennel"
  },
  {
    name: "Raisinet",
    pic: "https://i.postimg.cc/pLRRWg2j/Raisinet.jpg",
    kennel: 11,
    shelterID: "A755433",
    intakeDate: "1-15-19",
    description: "3 Yrs female, brown & black German Shepherd Dog",
    playStyle: "GD",
    active: true,
    notes: "gd, social, runs from humans in yard, hard to catch",
    socialization: [
      {
        name: "BRBreak",
        duration: 10,
        ampm: "am",
        done: false,
        inprogress: false

      },
      {
        name: "Group",
        duration: 40,
        ampm: "pm",
        done: false,
        inprogress: false

      }
    ],
    checkout: new Date('2019/02/16 10:30'),
    location: "Kennel"
  },
  {
    name: "Benson",
    pic: "https://i.postimg.cc/rwjcKQmP/Benson.jpg",
    kennel: 1,
    shelterID: "A753693",
    intakeDate: "12-13-2018",
    description: "2 Yrs NEUTERED, black & white Pit Bull Terrier",
    playStyle: "Soft RR",
    active: true,
    notes: "soft rr, social, sexually motivated",
    socialization: [
      {
        name: "Group",
        duration: 40,
        ampm: "am",
        done: false,
        inprogress: false
      },
      {
        name: "Group",
        duration: 40,
        ampm: "pm",
        done: false,
        inprogress: false

      }
    ],
    checkout: new Date('2019/02/16 10:30'),
    location: "Kennel"
  },
  {
    name: "Yuki",
    pic: "https://i.postimg.cc/XvDbgq9K/Yuki.jpg",
    kennel: 14,
    shelterID: "A754337",
    intakeDate: "12-24-2018",
    description: "2 Yrs female, tan & white Pit Bull Terrier mix",
    playStyle: "W",
    active: true,
    notes: "",
    socialization: [

      {
        name: "Walk",
        duration: 30,
        ampm: "am",
        done: false,
        inprogress: false

      },
      {
        name: "BRBreak",
        duration: 10,
        ampm: "am",
        done: false,
        inprogress: false

      },
      {
        name: "Walk",
        duration: 30,
        ampm: "pm",
        done: false,
        inprogress: false

      }
    ],
    checkout: new Date('2019/02/16 14:20'),
    location: "Kennel"
  },
];

const staffSeed = [
  {
    name: "Delyse",
    pic: "",
    email: "dgan@gmail.com",
    notes: "",
    mobile: "916-555-1212",
    available: true,
    location: "",
    password: "$2a$10$p5fT3TKLqWhAkyWZFjO/Iuk0z78v.bZkDHchOTvcdk8kUkUnGy3pC",
    active: true,
    admin: true
  },
  {
    name: "Robert",
    pic: "",
    email: "rive@gmail.com",
    notes: "",
    mobile: "530-555-1212",
    available: false,
    location: "",
    password: "$2a$10$p5fT3TKLqWhAkyWZFjO/Iuk0z78v.bZkDHchOTvcdk8kUkUnGy3pC",
    active: true,
    admin: true
  },
  {
    name: "Sandi",
    pic: "",
    email: "sandi@gmail.com",
    notes: "",
    mobile: "415-555-1212",
    available: false,
    location: "",
    password: "$2a$10$p5fT3TKLqWhAkyWZFjO/Iuk0z78v.bZkDHchOTvcdk8kUkUnGy3pC",
    active: true,
    admin: true
  },
  {
    name: "Caroline",
    pic: "",
    email: "carol@gmail.com",
    notes: "",
    mobile: "209-555-1212",
    available: false,
    location: "",
    password: "$2a$10$p5fT3TKLqWhAkyWZFjO/Iuk0z78v.bZkDHchOTvcdk8kUkUnGy3pC",
    active: false,
    admin: false
  },
  {
    name: "SuperUser",
    pic: "",
    email: "su@gmail.com",
    notes: "",
    mobile: "209-555-1212",
    available: false,
    location: "",
    password: "$2a$10$p5fT3TKLqWhAkyWZFjO/Iuk0z78v.bZkDHchOTvcdk8kUkUnGy3pC",
    active: true,
    admin: true
  },
];

db.Dog
  .remove({})
  .then(() => db.Dog.collection.insertMany(dogSeed))
  .then(data => {
    console.log(data.result.n + " Dog records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Staff
  .remove({})
  .then(() => db.Staff.collection.insertMany(staffSeed))
  .then(data => {
    console.log(data.result.n + " Staff records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });