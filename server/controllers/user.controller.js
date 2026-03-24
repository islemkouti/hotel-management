// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
export const getFavorites = async (req, res) => {
  try {
    // TODO: Fetch user's favorite hotels from database
    // const user = await User.findById(req.user.id).populate('favorites');
    // const favorites = user.favorites;

    // Mock favorites
    const favorites = [
      {
        id: '1',
        name: 'Grand Ocean Resort',
        location: 'Miami Beach, FL',
        image: '/images/hotel1.jpg',
        pricePerNight: 250,
        rating: 4.8,
      },
    ];

    res.json({
      success: true,
      data: { favorites },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorites',
      error: error.message,
    });
  }
};

// @desc    Add hotel to favorites
// @route   POST /api/users/favorites/:hotelId
// @access  Private
export const addFavorite = async (req, res) => {
  try {
    const { hotelId } = req.params;

    // TODO: Add hotel to user's favorites
    // const user = await User.findByIdAndUpdate(
    //   req.user.id,
    //   { $addToSet: { favorites: hotelId } },
    //   { new: true }
    // );

    res.json({
      success: true,
      message: 'Added to favorites',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to favorites',
      error: error.message,
    });
  }
};

// @desc    Remove hotel from favorites
// @route   DELETE /api/users/favorites/:hotelId
// @access  Private
export const removeFavorite = async (req, res) => {
  try {
    const { hotelId } = req.params;

    // TODO: Remove hotel from user's favorites
    // await User.findByIdAndUpdate(
    //   req.user.id,
    //   { $pull: { favorites: hotelId } }
    // );

    res.json({
      success: true,
      message: 'Removed from favorites',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from favorites',
      error: error.message,
    });
  }
};

// @desc    Get recently viewed hotels
// @route   GET /api/users/recently-viewed
// @access  Private
export const getRecentlyViewed = async (req, res) => {
  try {
    // TODO: Fetch recently viewed hotels from database
    // const user = await User.findById(req.user.id)
    //   .populate('recentlyViewed.hotel')
    //   .sort('recentlyViewed.viewedAt');
    // const recentlyViewed = user.recentlyViewed.slice(0, 10);

    // Mock recently viewed
    const recentlyViewed = [
      {
        id: '2',
        name: 'Mountain View Lodge',
        location: 'Aspen, CO',
        image: '/images/hotel2.jpg',
        pricePerNight: 180,
        viewedAt: '2024-03-10',
      },
    ];

    res.json({
      success: true,
      data: { recentlyViewed },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recently viewed',
      error: error.message,
    });
  }
};

// @desc    Add to recently viewed
// @route   POST /api/users/recently-viewed/:hotelId
// @access  Private
export const addRecentlyViewed = async (req, res) => {
  try {
    const { hotelId } = req.params;

    // TODO: Add hotel to recently viewed
    // Remove if already exists and add to front
    // await User.findByIdAndUpdate(req.user.id, {
    //   $pull: { recentlyViewed: { hotel: hotelId } },
    // });
    // await User.findByIdAndUpdate(req.user.id, {
    //   $push: {
    //     recentlyViewed: {
    //       $each: [{ hotel: hotelId, viewedAt: new Date() }],
    //       $position: 0,
    //       $slice: 10, // Keep only last 10
    //     },
    //   },
    // });

    res.json({
      success: true,
      message: 'Added to recently viewed',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to recently viewed',
      error: error.message,
    });
  }
};

// @desc    Get user dashboard stats
// @route   GET /api/users/dashboard-stats
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    // TODO: Calculate statistics from database
    // const bookingStats = await Booking.aggregate([
    //   { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
    //   {
    //     $group: {
    //       _id: null,
    //       totalBookings: { $sum: 1 },
    //       totalSpent: { $sum: '$totalPrice' },
    //       completedStays: {
    //         $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
    //       },
    //     },
    //   },
    // ]);

    // const upcomingBookings = await Booking.countDocuments({
    //   user: req.user.id,
    //   checkIn: { $gte: new Date() },
    //   status: { $in: ['pending', 'confirmed'] },
    // });

    // const reviewCount = await Review.countDocuments({ user: req.user.id });

    // Mock stats
    const stats = {
      totalStays: 5,
      totalNights: 12,
      totalSpent: 2500,
      upcomingBookings: 2,
      reviewsCount: 3,
      favoritesCount: 4,
      memberSince: '2023-01-15',
    };

    res.json({
      success: true,
      data: { stats },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message,
    });
  }
};
