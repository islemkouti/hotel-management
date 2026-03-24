// TODO: Implement Room model with Mongoose
// 
// const mongoose = require('mongoose');
// 
// const roomSchema = new mongoose.Schema({
//   hotel: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Hotel',
//     required: true,
//   },
//   name: {
//     type: String,
//     required: [true, 'Please add a room name'],
//     trim: true,
//   },
//   type: {
//     type: String,
//     required: [true, 'Please add a room type'],
//     enum: ['standard', 'deluxe', 'suite', 'presidential'],
//   },
//   description: {
//     type: String,
//     required: [true, 'Please add a description'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Please add a price'],
//     min: [0, 'Price cannot be negative'],
//   },
//   capacity: {
//     type: Number,
//     required: [true, 'Please add room capacity'],
//     min: [1, 'Capacity must be at least 1'],
//   },
//   beds: {
//     type: String,
//     required: [true, 'Please specify bed configuration'],
//   },
//   size: {
//     type: Number, // in square meters
//   },
//   amenities: [{
//     type: String,
//   }],
//   images: [{
//     type: String,
//   }],
//   available: {
//     type: Boolean,
//     default: true,
//   },
//   status: {
//     type: String,
//     enum: ['available', 'occupied', 'maintenance'],
//     default: 'available',
//   },
// }, {
//   timestamps: true,
// });
// 
// // Index for queries
// roomSchema.index({ hotel: 1, type: 1, price: 1 });
// 
// module.exports = mongoose.model('Room', roomSchema);

export default {};
