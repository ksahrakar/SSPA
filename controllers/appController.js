const db = require("../models");
const mongoose = require("mongoose");


// Defining methods for the dogsController
module.exports = {
  //will pull active saved dogs
  findAllDogs: function (req, res) {
    db.Dog
      .find({ active: true })
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findInactiveDogs: function (req, res) {
    db.Dog
      .find({ active: false })
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOneDog: function (req, res) {
    db.Dog
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateDog: function (req, res) {
    var query = { _id: req.body._id };
    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }
    db.Dog
      .findOneAndUpdate(query, req.body, {
        upsert: true, setDefaultsOnInsert: true
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteDog: function (req, res) {
    db.Dog
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllStaff: function (req, res) {
    db.Staff
      .find({ active: true })
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findInactiveStaff: function (req, res) {
    db.Staff
      .find({ active: false })
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findStaff: function (req, res) {
    db.Staff
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateStaff: function (req, res) {
    var query = { _id: req.body._id };
    if (!query._id) {
      query._id = new mongoose.mongo.ObjectID();
    }
    db.Staff
      .findOneAndUpdate(query, req.body, {
        upsert: true, setDefaultsOnInsert: true
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateStaffLogin: function (req, res) {
    var query = { _id: req.params.id };
    db.Staff.findOneAndUpdate(query, { $set: { active: true, available: true } }).
      then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateStaffLogout: function (req, res) {
    var query = { _id: req.params.id };
    db.Staff.findOneAndUpdate(query, { $set: { active: false, available: false } }).
      then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  deleteStaff: function (req, res) {
    db.Staff
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  checkoutDog: function (req, res) {
    var query = { _id: req.body.id };
    var location = req.body.location;

    db.Dog.findOneAndUpdate(query, { $set: { location: location, checkout: Date.now() } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },
  socInprogress: function (req, res) {
    var i = req.body.index, update = { "$set": {} };
    var query = { _id: req.body.id };
    update["$set"]["socialization." + i + ".inprogress"] = true;

    db.Dog.findOneAndUpdate(query, update)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },
  checkoutStaff: function (req, res) {
    var query = { _id: req.body.id };
    var location = req.body.location;
    db.Staff.findOneAndUpdate(query, { $set: { location: location, available: false } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },
  returnDog: function (req, res) {
    var query = { _id: req.body.id };

    db.Dog.findOneAndUpdate(query, { $set: { location: "Kennel" } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  socDone: function (req, res) {
    var i = req.body.index, update = { "$set": {} };
    var query = { _id: req.body.id };
    update["$set"]["socialization." + i + ".inprogress"] = false;

    db.Dog.findOneAndUpdate(query, update)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  socDone2: function (req, res) {
    var i = req.body.index, update = { "$set": {} };
    var query = { _id: req.body.id };
    update["$set"]["socialization." + i + ".done"] = true;

    db.Dog.findOneAndUpdate(query, update)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  returnStaff: function (req, res) {
    var query = { _id: req.body.id };
    db.Staff.findOneAndUpdate(query, { $set: { location: "", available: true } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};

