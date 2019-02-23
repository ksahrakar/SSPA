const express = require('express')
const router = require("express").Router();
const appController = require("../../controllers/appController");
const passport = require('../../passport');
const Staff = require("../../models/staff")



// Matches with "/api"

//find all  active dogs
router.route("/dogs")
  .get(appController.findAllDogs);

//find all inactive dogs
router.route("/dogsinactive")
  .get(appController.findInactiveDogs);

//get one dog
router.route("/dogs/:id")
  .get(appController.findOneDog);

//get one dog to edit.
router.route("/dog")
  .post(appController.updateDog);

router.route("/dogdelete/:id")
  .delete(appController.deleteDog);

//find all staff
router.route("/allstaff")
  .get(appController.findAllStaff);

//find all inactive staff
router.route("/staffinactive")
  .get(appController.findInactiveStaff);

//find one staff
router.route("/staff/:id")
  .get(appController.findStaff);

router.route("/staff")
  .post(appController.updateStaff);

//find all inactive staff
router.route("/staffinactive")
  .get(appController.findInactiveStaff);

// delete one staff by ID
router.route("/staffdelete/:id")
  .delete(appController.deleteStaff);

//once login marks as active/available
router.route("/staff/login/:id")
  .post(appController.updateStaffLogin)

//once logout marks as inactive/notavailable
router.route("/staff/logout/:id")
  .post(appController.updateStaffLogout)

//checkoutDog  soc marked inprogress.. dog location changed
router.route("/checkoutDog")
  .post(appController.checkoutDog)

router.route("/socInprogress")
  .post(appController.socInprogress)

//checkout Staff  - update not available/Location=doglocation
router.route("/checkoutStaff")
  .post(appController.checkoutStaff)
//returnDog soc marked done...dog in kennel
router.route("/returnDog")
  .post(appController.returnDog)

router.route("/socDone")
  .post(appController.socDone)

router.route("/socDone2")
  .post(appController.socDone2)

//return Staff - update is available / location is cleared
router.route("/returnStaff")
  .post(appController.returnStaff)

//PASSPORT NO APPCONTROLLER.JS//
//////////////////////////////
/////////////////////////////
/////////////////////////////

//SIGN UP
router.post('/signup', (req, res) => {
  const { email, password, name } = req.body
  // ADD VALIDATION
  Staff.findOne({ email: email }, (err, staff) => {
    if (err) {
      console.log('Staff.js post error: ', err)
    } else if (staff) {
      res.json({
        error: `Sorry, already a staff with the email: ${email}`
      })
    }
    else {
      const newStaff = new Staff({
        email: email,
        password: password,
        name: name
      })
      newStaff.save((err, savedStaff) => {
        if (err) return res.json(err)
        res.json(savedStaff)
      })
    }

  })
});

//LOGIN 
router.post(
  '/login',
  function (req, res, next) {
    console.log(req.body)
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log(req.user);

    var userInfo = {
      email: req.user.email,
      id: req.user._id,
      admin: req.user.admin
    }

    res.send(userInfo);
  }
)

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user);

  if (req.user) {
    res.json({ staff: req.user })
  } else {
    res.json({ staff: null })
  }
})

router.post('/logout', (req, res) => {
  if (req.user) {
    res.send({ msg: 'logging out' })
  } else {
    res.send({ msg: 'no staff to log out' })
  }
})


module.exports = router;
