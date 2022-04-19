const express = require('express');
const connectDB = require('./config/db')
var cors = require('cors');

//routes
const userapi = require('./routes/api/userapi');
const managerapi = require('./routes/api/managerapi');
const attendanceapi = require('./routes/api/attendanceapi');

const app = express();

//connect database
connectDB();

//cors
app.use(cors({ origin: true, credentials: true }));

// Init middleware
app.use(express.json({ extended: false }))

// use routes
app.use('/api/users', userapi);
app.use('/api/manager', managerapi);
app.use('/api/attendance', attendanceapi);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));