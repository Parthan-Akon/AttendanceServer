const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    timein: {
        type: Date,
        required: true
    },
    timeout: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        default: '0'
    },
    minute: {
        type: String,
        default: '0'
    },
    second: {
        type: String,
        default: '0'
    }
})

module.exports = Attendance = mongoose.model('Attendance',attendanceSchema)