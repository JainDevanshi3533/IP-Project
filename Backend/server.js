const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: './config/config.env' });

const app = express();

// Setup Mongoose & MongoDB

mongoose.connect(
  'mongodb+srv://mndgmndg:mndgmndg@cluster0.fyj4j2t.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to the database'.magenta);
    // Perform additional operations here
  })
  .catch((error) => {
    console.log(`Failed to connect to the database: ${error}`);
  });

// Import Routes
const authRoute = require('./src/routes/auth');

// Middleware
app.use(express.json());
// Route Middlewares
app.use('/api/users', authRoute);



// Default Route
app.get('/api', (req, res) => res.send('Hello world!'));




const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);