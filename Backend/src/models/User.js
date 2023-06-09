const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const calendarSchema = require('./Calendar');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'last name can not be blank'],
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 255,
    trim: true,
  },
  sex: {
    type: String,
    lowercase: true,
    enum: ['male', 'female'],
  },
  weight: {
    type: Number,
    min: 1,
    max: 442,
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
    minlength: 10,
    maxlength: 24,
    trim: true,
  },
  address: {
    number: {
      type: Number,
      min: 1,
      max: 5000,
    },
    street: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    city: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    state: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    country: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    postcode: {
      type: Number,
      min: 1,
      max: 1000000,
    },
  },
  email: {
    type: String,
    required: [true, 'email name can not be blank'],
    minlength: 6,
    maxlength: 255,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password can not be blank'],
    minlength: 6,
    maxlength: 1024,
    trim: true,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  doctorInfo: {
    licence: {
      type: String,
      min: 6,
      max: 12,
    },
    accreditation: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],
    specialtyField: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    subSpecialtyField: {
      type: String,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    education: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],
    yearsExperience: {
      type: Number,
      min: 0,
      max: 100,
    },
    tags: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],
    languagesSpoken: [
      {
        type: String,
        minlength: 1,
        maxlength: 255,
      },
    ],
    calendar: {
      calendarSchema,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  clientInfo: {
    medicalHistory: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          auto: true,
        },
        startDate: {
          type: Date,
        },
        condition: {
          type: String,
          minlength: 1,
          maxlength: 255,
          trim: true,
        },
        notes: {
          type: String,
          minlength: 1,
          maxlength: 1000,
          trim: true,
        },
      },
    ],
    allergies: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          auto: true,
        },
        name: {
          type: String,
          minlength: 1,
          maxlength: 255,
          trim: true,
        },
        severity: {
          type: Number,
          min: 1,
          max: 5,
          default: 1,
        },
      },
    ],
    medication: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          index: true,
          auto: true,
        },
        name: {
          type: String,
          minlength: 1,
          maxlength: 255,
          trim: true,
        },
        dosage: {
          type: Number,
          min: 1,
          max: 10000,
        },
        manufacturer: {
          type: String,
          minlength: 1,
          maxlength: 255,
          trim: true,
        },
      },
    ],
    bloodType: {
      type: String,
      uppercase: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});



userSchema.statics.findByCredentials = async (email, password) => {
  // // Obscure 400 incorrect email or password messages to prevent hacking
  // Method 1 // return res.status(400).send('email or password is incorrect');
  // Method 2 preferred: throw new Error(...)

  // Check if email exists
  const user = await User.findOne({ email });
  if (!user) throw new Error('email  is incorrect');

  // Check if password is correct
  const isMatchedPass = await bcrypt.compare(password,user.password);

  if (isMatchedPass==false) throw new Error(`${password}  ${user.password} ${isMatchedPass}`);
};

// Create and assign a token
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.TOKEN_SECRET
  );
  console.log("hh");
  console.log(token);
  // Concat new token to tokens array
  user.tokens = user.tokens.concat({ token });
  console.log("hh");
  await user.save();

  return token;

  // Method 2 (in route) res.header('auth-token', token).send(token);
  
};

// userSchema.methods.toJSON = function () {
//     const user = this;
//     const userObject = user.toObject();
  
//     delete userObject.password;
//     delete userObject.tokens;
  
//     return userObject;
//   };
const User = mongoose.model('User', userSchema);
  
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

module.exports = User;