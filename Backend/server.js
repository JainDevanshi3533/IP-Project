// index.js
const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');

const app = express();

// // middleware
// app.use(bodyParser.json());
// app.use(cors());

// // connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/hospital', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

// // define routes
// const patientRoutes = require('./routes/patients');
// app.use('/patients', patientRoutes);

// const doctorRoutes = require('./routes/doctors');
// app.use('/doctors', doctorRoutes);

// const appointmentRoutes = require('./routes/appointments');
// app.use('/appointments', appointmentRoutes);

app.get("/", function(req,res){
    res.send("running");
})
// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));