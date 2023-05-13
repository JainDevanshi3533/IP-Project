const mongoose = require('mongoose');
const colors = require('colors');

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
  
  // Check if the connection is successful
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB');
  })
  ;