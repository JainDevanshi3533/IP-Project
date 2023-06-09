const seeder = require('mongoose-seed');
const faker = require('faker');
// const mongoose = require('mongoose');
const minWeight = 2;
const maxWeight = 180;
const minAddrNum = 1;
const maxAddrNum = 250;
// mongoose.connect(
//   'mongodb+srv://mndgmndg:mndgmndg@cluster0.fyj4j2t.mongodb.net/test?retryWrites=true&w=majority',
//   { useNewUrlParser: true,
//     createIndexes: true })
//   .then(() => {
//     console.log('Connected to the database'.magenta);
//     // Perform additional operations here
//   })
//   .catch((error) => {
//     console.log(`Failed to connect to the database: ${error}`);
//   });
// // Data array containing seed data - documents organized by Model
const data = [{
  model: 'User',
  documents: [{
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    title: 'Mr',
    sex: 'male',
    weight: Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight,
    dateOfBirth: faker.date.past(),
    phoneNumber: faker.phone.phoneNumber(),
    address: {
      number: Math.floor(Math.random() * (maxAddrNum - minAddrNum + 1)) +
        minAddrNum,
      street: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      postcode: parseInt(faker.address.zipCode()),
    },
    email: faker.internet.email(),
    password: 'password',
    isDoctor: false,
    clientInfo: {
      medicalHistory: [{
        startDate: faker.date.recent(),
        condition: 'Asthma',
        notes: 'Lorem Ipsum',
      }, ],
      allergies: [{
        name: 'peanut',
        severity: Math.floor(Math.random() * Math.floor(5)),
      }, ],
      medication: [{
        name: 'penicillin',
        dosage: Math.floor(Math.random() * Math.floor(6)),
        manufacturer: faker.company.companyName(),
      }, ],
      bloodType: 'O+',
    },
  }, {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    title: 'Dr',
    sex: 'male',
    weight: Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight,
    dateOfBirth: faker.date.past(),
    phoneNumber: faker.phone.phoneNumber(),
    address: {
      number: Math.floor(Math.random() * (maxAddrNum - minAddrNum + 1)) +
        minAddrNum,
      street: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      postcode: parseInt(faker.address.zipCode()),
    },
    email: faker.internet.email(),
    password: 'password',
    isDoctor: true,
    doctorInfo: {
      licence: 'AustDocL123',
      accreditation: 'Doctor of Medicine',
      specialtyField: 'General Practitioner',
      subSpecialtyField: 'Paediatrics',
      education: [
        'University of Sydney'
      ],
      yearsExperience: Math.floor(Math.random() * Math.floor(50)),
      tags: [
        'Sydney', 'Paediatrics',
      ],
      languagesSpoken: [
        'English', 'Spanish'
      ],
      rating: Math.floor(Math.random() * Math.floor(5)),
    },
  }, ],
}, ];

// Connect to MongoDB via Mongoose
seeder.connect('mongodb+srv://mndgmndg:mndgmndg@cluster0.fyj4j2t.mongodb.net/test?retryWrites=true&w=majority', function () {
  // Load Mongoose models
  seeder.loadModels(['../models/User.js']);

  // Clear specified collections
  seeder.clearModels(['User'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      console.log('Database seeded');
      seeder.disconnect();
    });
  });
});