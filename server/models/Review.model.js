// TODO: Implement Review model with Mongoose
// 
// const mongoose = require('mongoose');
// 
// const reviewSchema = new mongoose.Schema({
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
//   booking: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Booking',
//   },
//   rating: {
//     type: Number,
//     required: [true, 'Please add a rating'],
//     min: [1, 'Rating must be at least 1'],
//     max: [5, 'Rating cannot be more than 5'],
//   },
//   comment: {
//     type: String,
//     required: [true, 'Please add a comment'],
//     maxlength: [1000, 'Comment cannot be more than 1000 characters'],
//   },
//   images: [{
//     type: String,
//   }],
//   helpfulBy: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   }],
//   response: {
//     text: String,
//     respondedAt: Date,
//     respondedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   },
// }, {
//   timestamps: true,
// });
// 
// // Prevent duplicate reviews
// reviewSchema.index({ user: 1, hotel: 1 }, { unique: true });
// 
// // Calculate average rating after save
// reviewSchema.statics.getAverageRating = async function(hotelId) {
//   const stats = await this.aggregate([
//     { $match: { hotel: hotelId } },
//     {
//       $group: {
//         _id: '$hotel',
//         averageRating: { $avg: '$rating' },
//         totalReviews: { $sum: 1 },
//       },
//     },
//   ]);
// 
//   await this.model('Hotel').findByIdAndUpdate(hotelId, {
//     rating: stats[0]?.averageRating || 0,
//     totalReviews: stats[0]?.totalReviews || 0,
//   });
// };
// 
// reviewSchema.post('save', function() {
//   this.constructor.getAverageRating(this.hotel);
// });
// 
// reviewSchema.post('deleteOne', { document: true }, function() {
//   this.constructor.getAverageRating(this.hotel);
// });
// 
// module.exports = mongoose.model('Review', reviewSchema);

export default {};
