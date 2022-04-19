const express = require('express');
const Employee = require('../../models/Employee');
const router = express.Router();

const User = require('../../models/User');


// @route GET api/users 
// @descrition get list of users
// @access public
router.get('/list', (req, res) => {
    User
        .find()
        .then(data => {
            console.log("here");
            res.json(data)
        })
        .catch(err => {
            console.error(err)
            res.status(404).json({ noRecordFound: 'No record found' })
        })
})


// @route POST api/users
// @description add/save user
// @access Public
router.post('/', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ error: 'Unable to add this User' }));
});

router.post('/login', (req, res) => {
    console.log(req.body.username)

    User.find({ username: req.body.username }).then(user => res.json(user))
        .catch(err => res.status(404).json({ notFound: "Not found" }))
})

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(data => {
            console.log(data);
            if(data.role === 'Employee'){
                Employee.findOneAndRemove({name: data.username}).then(
                    user => res.json(user)
                ).catch(
                    err => res.status(404).json({error: 'No such record found!'})
                )
            } else {
                res.json({ msg: 'User is deleted' })
            }
            
        })
        .catch(err => res.status(404).json({ error: 'No such entry' }));
})


module.exports = router;