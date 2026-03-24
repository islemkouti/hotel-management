// @desc    Get admin dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // TODO: Fetch statistics from database
    // const totalHotels = await Hotel.countDocuments();
    // const totalRooms = await Room.countDocuments();
    // const totalUsers = await User.countDocuments();
    // const totalBookings = await Booking.countDocuments();
    
    // const bookingStats = await Booking.aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       totalRevenue: { $sum: '$totalPrice' },
    //       avgBookingValue: { $avg: '$totalPrice' },
    //     },
    //   },
    // ]);

    // const monthlyBookings = await Booking.aggregate([
    //   {
    //     $group: {
    //       _id: { $month: '$createdAt' },
    //       count: { $sum: 1 },
    //       revenue: { $sum: '$totalPrice' },
    //     },
    //   },
    //   { $sort: { '_id': 1 } },
    // ]);

    // Mock statistics
    const stats = {
      totalHotels: 25,
      totalRooms: 450,
      totalUsers: 1250,
      totalBookings: 3500,
      totalRevenue: 875000,
      avgBookingValue: 250,
      occupancyRate: 72,
      monthlyBookings: [
        { month: 'Jan', bookings: 280, revenue: 70000 },
        { month: 'Feb', bookings: 320, revenue: 80000 },
        { month: 'Mar', bookings: 350, revenue: 87500 },
      ],
      topHotels: [
        { id: '1', name: 'Grand Ocean Resort', bookings: 450, revenue: 112500 },
        { id: '2', name: 'Mountain View Lodge', bookings: 380, revenue: 68400 },
        { id: '3', name: 'City Center Hotel', bookings: 420, revenue: 134400 },
      ],
      recentBookings: [
        {
          id: '1',
          user: 'John Doe',
          hotel: 'Grand Ocean Resort',
          checkIn: '2024-03-15',
          amount: 1250,
          status: 'confirmed',
        },
      ],
    };

    res.json({
      success: true,
      data: { stats },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin stats',
      error: error.message,
    });
  }
};

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role } = req.query;

    // TODO: Fetch users from database
    // let query = User.find().select('-password');
    // if (search) {
    //   query = query.or([
    //     { name: { $regex: search, $options: 'i' } },
    //     { email: { $regex: search, $options: 'i' } },
    //   ]);
    // }
    // if (role) {
    //   query = query.where('role').equals(role);
    // }
    // const users = await query
    //   .skip((page - 1) * limit)
    //   .limit(parseInt(limit))
    //   .sort('-createdAt');
    // const total = await User.countDocuments();

    // Mock users
    const users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        status: 'active',
        bookingsCount: 5,
        createdAt: '2023-01-15',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user',
        status: 'active',
        bookingsCount: 3,
        createdAt: '2023-02-20',
      },
      {
        id: '3',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        status: 'active',
        bookingsCount: 0,
        createdAt: '2023-01-01',
      },
    ];

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: users.length,
          pages: Math.ceil(users.length / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

// @desc    Get user by ID (Admin)
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Fetch user from database
    // const user = await User.findById(id)
    //   .select('-password')
    //   .populate('bookings')
    //   .populate('reviews');

    // Mock user
    const user = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      phone: '+1234567890',
      createdAt: '2023-01-15',
      bookings: [],
      reviews: [],
    };

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// @desc    Update user status (Admin)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // TODO: Update user status in database
    // const user = await User.findByIdAndUpdate(
    //   id,
    //   { status },
    //   { new: true }
    // );

    res.json({
      success: true,
      message: 'User status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user status',
      error: error.message,
    });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/admin/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, hotel, startDate, endDate } = req.query;

    // TODO: Fetch bookings from database
    // let query = Booking.find()
    //   .populate('user', 'name email')
    //   .populate('hotel', 'name')
    //   .populate('room', 'name');
    
    // if (status) query = query.where('status').equals(status);
    // if (hotel) query = query.where('hotel').equals(hotel);
    // if (startDate) query = query.where('checkIn').gte(new Date(startDate));
    // if (endDate) query = query.where('checkOut').lte(new Date(endDate));
    
    // const bookings = await query
    //   .skip((page - 1) * limit)
    //   .limit(parseInt(limit))
    //   .sort('-createdAt');

    // Mock bookings
    const bookings = [
      {
        id: '1',
        user: { id: '1', name: 'John Doe', email: 'john@example.com' },
        hotel: { id: '1', name: 'Grand Ocean Resort' },
        room: { id: '1', name: 'Deluxe Ocean View' },
        checkIn: '2024-03-15',
        checkOut: '2024-03-20',
        guests: 2,
        totalPrice: 1250,
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: '2024-03-01',
      },
    ];

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: bookings.length,
          pages: Math.ceil(bookings.length / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};

// @desc    Update booking status (Admin)
// @route   PUT /api/admin/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // TODO: Update booking status in database
    // const booking = await Booking.findByIdAndUpdate(
    //   id,
    //   { status },
    //   { new: true }
    // );

    res.json({
      success: true,
      message: 'Booking status updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking status',
      error: error.message,
    });
  }
};

// @desc    Get global calendar (all bookings)
// @route   GET /api/admin/calendar
// @access  Private/Admin
export const getGlobalCalendar = async (req, res) => {
  try {
    const { month, year, hotelId } = req.query;

    // TODO: Fetch bookings for calendar view
    // const startDate = new Date(year, month - 1, 1);
    // const endDate = new Date(year, month, 0);
    
    // let query = Booking.find({
    //   $or: [
    //     { checkIn: { $gte: startDate, $lte: endDate } },
    //     { checkOut: { $gte: startDate, $lte: endDate } },
    //     { checkIn: { $lte: startDate }, checkOut: { $gte: endDate } },
    //   ],
    // })
    //   .populate('hotel', 'name')
    //   .populate('room', 'name')
    //   .populate('user', 'name');
    
    // if (hotelId) {
    //   query = query.where('hotel').equals(hotelId);
    // }
    
    // const bookings = await query;

    // Mock calendar data
    const calendarData = {
      month: month || new Date().getMonth() + 1,
      year: year || new Date().getFullYear(),
      bookings: [
        {
          id: '1',
          hotel: 'Grand Ocean Resort',
          room: 'Deluxe Ocean View',
          guest: 'John Doe',
          checkIn: '2024-03-15',
          checkOut: '2024-03-20',
          status: 'confirmed',
        },
        {
          id: '2',
          hotel: 'Mountain View Lodge',
          room: 'Standard Room',
          guest: 'Jane Smith',
          checkIn: '2024-03-18',
          checkOut: '2024-03-22',
          status: 'pending',
        },
      ],
    };

    res.json({
      success: true,
      data: { calendar: calendarData },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching calendar',
      error: error.message,
    });
  }
};

// @desc    Get review statistics (Admin)
// @route   GET /api/admin/reviews/stats
// @access  Private/Admin
export const getReviewStats = async (req, res) => {
  try {
    // TODO: Calculate review statistics
    // const stats = await Review.aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       totalReviews: { $sum: 1 },
    //       avgRating: { $avg: '$rating' },
    //       fiveStars: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } },
    //       // ... other ratings
    //     },
    //   },
    // ]);

    // Mock stats
    const stats = {
      totalReviews: 850,
      averageRating: 4.3,
      ratingDistribution: {
        5: 400,
        4: 250,
        3: 120,
        2: 50,
        1: 30,
      },
      recentReviews: [
        {
          id: '1',
          user: 'John Doe',
          hotel: 'Grand Ocean Resort',
          rating: 5,
          comment: 'Amazing experience!',
          createdAt: '2024-03-10',
        },
      ],
    };

    res.json({
      success: true,
      data: { stats },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching review stats',
      error: error.message,
    });
  }
};
