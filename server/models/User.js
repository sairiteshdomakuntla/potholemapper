const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['commuter', 'municipality', 'admin'],
    default: 'commuter'
  },
  phone: {
    type: String,
    required: function() {
      return this.role === 'municipality' || this.role === 'admin';
    }
  },
  department: {
    type: String,
    required: function() {
      return this.role === 'municipality';
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function() {
      return this.role === 'municipality';
    }
  }
}, {
  timestamps: true
});

// Prevent multiple admin accounts
userSchema.pre('save', async function(next) {
  if (this.role === 'admin' && this.isNew) {
    const existingAdmin = await mongoose.model('User').findOne({ role: 'admin' });
    if (existingAdmin && existingAdmin._id.toString() !== this._id.toString()) {
      const error = new Error('Only one admin account is allowed');
      return next(error);
    }
  }
  next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);