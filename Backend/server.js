const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config({ path: './config/config.env' });

const app = express();
// Setup Mongoose & MongoDB
// const client =mongoose.connect(
  // 'mongodb+srv://mndgmndg:mndgmndg@cluster0.fyj4j2t.mongodb.net/test?retryWrites=true&w=majority',
  // { useNewUrlParser: true ,
  //   useUnifiedTopology: true,
  //   writeConcern: {
  //     w: 'majority',
  //     j: true,
  //     wtimeout: 1000
  //   }})
  // .then(() => {
  //   console.log('Connected to the database');
  //   // Perform additional operations here
  // })
  // .catch((error) => {
  //   console.log(`Failed to connect to the database: ${error}`);
  // });
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  });
  
  // Check if the connection is successful
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB');
  });
// // Import Routes
const authRoute = require('./src/routes/auth');

// // Middleware
app.use(express.json());

// // Route Middlewares
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