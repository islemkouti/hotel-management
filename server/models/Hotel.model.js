// TODO: Implement Hotel model with Mongoose
// 
// const mongoose = require('mongoose');
// 
// const hotelSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please add a hotel name'],
//     trim: true,
//     maxlength: [100, 'Name cannot be more than 100 characters'],
//   },
//   description: {
//     type: String,
//     required: [true, 'Please add a description'],
//     maxlength: [2000, 'Description cannot be more than 2000 characters'],
//   },
//   location: {
//     type: String,
//     required: [true, 'Please add a location'],
//   },
//   address: {
//     type: String,
//     required: [true, 'Please add an address'],
//   },
//   coordinates: {
//     lat: Number,
//     lng: Number,
//   },
//   images: [{
//     type: String,
//   }],
//   pricePerNight: {
//     type: Number,
//     required: [true, 'Please add price per night'],
//     min: [0, 'Price cannot be negative'],
//   },
//   rating: {
//     type: Number,
//     min: [0, 'Rating must be at least 0'],
//     max: [5, 'Rating cannot be more than 5'],
//     default: 0,
//   },
//   totalReviews: {
//     type: Number,
//     default: 0,
//   },
//   amenities: [{
//     type: String,
//   }],
//   policies: {
//     checkIn: String,
//     checkOut: String,
//     cancellation: String,
//   },
//   totalRooms: {
//     type: Number,
//     default: 0,
//   },
//   featured: {
//     type: Boolean,
//     default: false,
//   },
//   status: {
//     type: String,
//     enum: ['active', 'inactive', 'maintenance'],
//     default: 'active',
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true },
// });
// 
// // Virtual for rooms
// hotelSchema.virtual('rooms', {
//   ref: 'Room',
//   localField: '_id',
//   foreignField: 'hotel',
//   justOne: false,
// });
// 
// // Virtual for reviews
// hotelSchema.virtual('reviews', {
//   ref: 'Review',
//   localField: '_id',
//   foreignField: 'hotel',
//   justOne: false,
// });
// 
// // Index for search
// hotelSchema.index({ name: 'text', location: 'text', description: 'text' });
// hotelSchema.index({ location: 1, pricePerNight: 1, rating: -1 });
// 
// module.exports = mongoose.model('Hotel', hotelSchema);

export default {};
