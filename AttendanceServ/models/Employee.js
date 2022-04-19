const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    managerID: {
        type: String,
        required: true

    },
    managerName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = Employee = mongoose.model('Employee', employeeSchema)