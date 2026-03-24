// TODO: Implement User model with Mongoose
// 
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// 
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please add a name'],
//     trim: true,
//     maxlength: [50, 'Name cannot be more than 50 characters'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Please add an email'],
//     unique: true,
//     lowercase: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
//   },
//   password: {
//     type: String,
//     required: [true, 'Please add a password'],
//     minlength: 6,
//     select: false,
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
//   phone: {
//     type: String,
//     maxlength: [20, 'Phone number cannot be longer than 20 characters'],
//   },
//   avatar: {
//     type: String,
//     default: 'default-avatar.png',
//   },
//   status: {
//     type: String,
//     enum: ['active', 'inactive', 'banned'],
//     default: 'active',
//   },
//   favorites: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Hotel',
//   }],
//   recentlyViewed: [{
//     hotel: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Hotel',
//     },
//     viewedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   }],
//   resetPasswordToken: String,
//   resetPasswordExpire: Date,
// }, {
//   timestamps: true,
// });
// 
// // Encrypt password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// 
// // Match password
// userSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
// 
// module.exports = mongoose.model('User', userSchema);

export default {};
