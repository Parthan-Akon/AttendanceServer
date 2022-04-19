const express = require('express');
const Attendance = require('../../models/Attendance');
const router = express.Router();


// @route POST api/attendance/userid
// @description add attendance
// @access PUBLIC

router.post('/', (req,res) => {

    console.log(req.body)
    Attendance.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json({error: err}))
})

// @route PUT api/attendance/userid
// @description add description
// @access PUBLIC

router.put('/:attend_id', (req,res) => {

    Attendance.findByIdAndUpdate(req.params.attend_id, req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json({error: err}))


})


// @route GET api/attendance/userid
// @description get attendance of useri
// @access public

router.get('/:uid',(req,res) => {

    

    Attendance.findOne({userID: req.params.uid},{}, { sort: { 'timein' : -1 } })
    .then(data => res.json(data))
    .catch(err => res.status(404).json({error: err}))

})

// @route GET api/attendance/all/userid
// @description get all attendance of useri
// @access public

router.get('/:uid/all',(req,res) => {
    Attendance.find({userID: req.params.uid})
    .then(data => res.json(data))
    .catch(err => res.status(404).json({error: err}))

})

//@route GET api/attendance/search?date=
//@description search by date
//@access public

router.get('/:uid/search',(req,res) => {

    var user_date = new Date(req.query.date);
    user_date.setHours(0,0,0,0);
    console.log(user_date.getTime());

    console.log("here");
    console.log(req.query.date);

    Attendance.find({timein: { $gte: user_date}, userID: req.params.uid})
    .then(data => res.json(data))
    .catch(err => res.status(404).json({error: err}))
    
    // db.posts.find({ 
    //     created_on: {
    //         $gte: new Date(2012, 7, 14), 
    //         $lt: new Date(2012, 7, 15)
    //     }
    // })

    
})


module.exports = router;