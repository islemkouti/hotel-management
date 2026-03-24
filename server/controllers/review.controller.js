// Mock reviews data
const mockReviews = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    hotelId: '1',
    rating: 5,
    comment: 'Amazing experience! The ocean view was breathtaking.',
    images: [],
    createdAt: '2024-02-15',
    helpful: 12,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    hotelId: '1',
    rating: 4,
    comment: 'Great location and service. Room was clean and comfortable.',
    images: [],
    createdAt: '2024-02-10',
    helpful: 8,
  },
];

// @desc    Get reviews for a hotel
// @route   GET /api/reviews/hotel/:hotelId
// @access  Public
export const getHotelReviews = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;

    // TODO: Fetch reviews from database
    // const reviews = await Review.find({ hotel: hotelId })
    //   .populate('user', 'name avatar')
    //   .sort(sort)
    //   .skip((page - 1) * limit)
    //   .limit(parseInt(limit));
    
    // const total = await Review.countDocuments({ hotel: hotelId });
    
    // const avgRating = await Review.aggregate([
    //   { $match: { hotel: mongoose.Types.ObjectId(hotelId) } },
    //   { $group: { _id: null, average: { $avg: '$rating' } } },
    // ]);

    const reviews = mockReviews.filter(r => r.hotelId === hotelId);
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

    res.json({
      success: true,
      data: {
        reviews,
        averageRating: avgRating.toFixed(1),
        totalReviews: reviews.length,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: reviews.length,
          pages: Math.ceil(reviews.length / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message,
    });
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/my-reviews
// @access  Private
export const getMyReviews = async (req, res) => {
  try {
    // TODO: Fetch user's reviews from database
    // const reviews = await Review.find({ user: req.user.id })
    //   .populate('hotel', 'name images')
    //   .sort('-createdAt');

    const reviews = mockReviews.filter(r => r.userId === req.user.id);

    res.json({
      success: true,
      data: { reviews },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message,
    });
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { hotelId, rating, comment, images } = req.body;

    // TODO: Verify user has a completed booking at this hotel
    // const hasBooking = await Booking.findOne({
    //   user: req.user.id,
    //   hotel: hotelId,
    //   status: 'completed',
    // });
    // if (!hasBooking) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'You can only review hotels where you have completed a stay',
    //   });
    // }

    // TODO: Check if user already reviewed this hotel
    // const existingReview = await Review.findOne({
    //   user: req.user.id,
    //   hotel: hotelId,
    // });
    // if (existingReview) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'You have already reviewed this hotel',
    //   });
    // }

    // TODO: Create review in database
    // const review = await Review.create({
    //   user: req.user.id,
    //   hotel: hotelId,
    //   rating,
    //   comment,
    //   images,
    // });

    // TODO: Update hotel average rating
    // const reviews = await Review.find({ hotel: hotelId });
    // const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    // await Hotel.findByIdAndUpdate(hotelId, { rating: avgRating });

    const newReview = {
      id: Date.now().toString(),
      userId: req.user.id,
      userName: req.user.name || 'Anonymous',
      hotelId,
      rating,
      comment,
      images: images || [],
      createdAt: new Date().toISOString(),
      helpful: 0,
    };

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: { review: newReview },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: error.message,
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, images } = req.body;

    // TODO: Fetch review from database
    // const review = await Review.findById(id);
    // if (!review) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Review not found',
    //   });
    // }

    // // Check ownership
    // if (review.user.toString() !== req.user.id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to update this review',
    //   });
    // }

    // TODO: Update review
    // review.rating = rating || review.rating;
    // review.comment = comment || review.comment;
    // review.images = images || review.images;
    // review.updatedAt = new Date();
    // await review.save();

    // TODO: Recalculate hotel average rating

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: { review: { id, rating, comment, images } },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message,
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Fetch review from database
    // const review = await Review.findById(id);
    // if (!review) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Review not found',
    //   });
    // }

    // // Check ownership or admin
    // if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to delete this review',
    //   });
    // }

    // TODO: Delete review
    // await review.deleteOne();

    // TODO: Recalculate hotel average rating

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message,
    });
  }
};

// @desc    Mark review as helpful
// @route   POST /api/reviews/:id/helpful
// @access  Private
export const markHelpful = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Update helpful count in database
    // const review = await Review.findByIdAndUpdate(
    //   id,
    //   { $addToSet: { helpfulBy: req.user.id } },
    //   { new: true }
    // );
    // if (!review) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Review not found',
    //   });
    // }

    res.json({
      success: true,
      message: 'Marked as helpful',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error marking review as helpful',
      error: error.message,
    });
  }
};
