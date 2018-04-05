const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const transactionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  created: { type: Date, required: true },
  amount: { type: Number, required: true },
  currency: { type: String },
  local_amount: { type: Number },
  local_currency: { type: String },
  category: { type: String },
  emoji: { type: String },
  description: { type: String },
  address: { type: String },
  notes: { type: String },
  receipt: { type: String }

});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String, default: 'https://enbaca.com/web/assets/image-resources/avatar.png'},
  admin: { type: Boolean },
  email: { type: String, required: true, unique: true }, // needs a pattern!
  password: { type: String, required: true },
  created: { type: Date, default: new Date()},
  transactions: [ transactionSchema ]

});

// Add the virtual for passwordConfirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

//pre-validate hook ->
userSchema.pre('validate', function checkPassword(next) {
//password modification validation ->
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
//rehash modified password ->
  if(this.isModified('password')) {
    //store hashed bcrypt password and add to user object ->
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// compareSync to compare plain text to hash ->
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
