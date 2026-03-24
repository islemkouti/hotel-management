// TODO: Implement Booking model with Mongoose
// 
// const mongoose = require('mongoose');
// 
// const bookingSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   hotel: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Hotel',
//     required: true,
//   },
//   room: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Room',
//     required: true,
//   },
//   checkIn: {
//     type: Date,
//     required: [true, 'Please add check-in date'],
//   },
//   checkOut: {
//     type: Date,
//     required: [true, 'Please add check-out date'],
//   },
//   guests: {
//     adults: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//     children: {
//       type: Number,
//       default: 0,
//     },
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'completed', 'cancelled'],
//     default: 'pending',
//   },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'refunded', 'failed'],
//     default: 'pending',
//   },
//   paymentMethod: {
//     type: String,
//   },
//   transactionId: {
//     type: String,
//   },
//   specialRequests: {
//     type: String,
//   },
//   cancellationReason: {
//     type: String,
//   },
//   cancelledAt: {
//     type: Date,
//   },
// }, {
//   timestamps: true,
// });
// 
// // Index for queries
// bookingSchema.index({ user: 1, status: 1 });
// bookingSchema.index({ hotel: 1, checkIn: 1, checkOut: 1 });
// bookingSchema.index({ room: 1, checkIn: 1, checkOut: 1 });
// 
// // Validate checkout is after checkin
// bookingSchema.pre('save', function(next) {
//   if (this.checkOut <= this.checkIn) {
//     next(new Error('Check-out date must be after check-in date'));
//   }
//   next();
// });
// 
// module.exports = mongoose.model('Booking', bookingSchema);

export default {};
