const express = require('express');
const router = express.Router();

const Employee = require('../../models/Employee');
const User = require('../../models/User');

// @route POST api/manager/managerid
// @description Create an Employee
// @access public

router.post('/', (req, res) => {

    console.log(req.body)
    Employee.create(req.body)
        .then(emp => res.json(emp))
        .catch(err => res.status(400).json({ error: err }))

})

// @route GET api/manager/employeelist/managerid
// @description get employee list by Id 
// @access public

router.get('/emplist/:mngid', (req, res) => {

    Employee.find({ managerID: req.params.mngid })
        .then(emp => res.json(emp))
        .catch(err => res.status(400).json({ error: err }))
})


// @route DELETE api/manager/employeeid
// @description delete an employee
// @access public

router.delete('/emp/:empid',(req,res) => {

    var employee;

    Employee.findByIdAndRemove(req.params.empid).then(
        emp => {           
            
            employee = emp;
            User.findOneAndRemove({username : employee.name}).then(
                data => {                           
                    console.log(data)
                    res.json(emp);
                }
                
            ).catch(err => res.status(404).json({error: 'User not found!'}))

            console.log(employee)
        }
    ).catch(err => res.status(400).json({error: err}))

   


})

module.exports = router;