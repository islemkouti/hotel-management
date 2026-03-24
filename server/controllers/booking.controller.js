// Mock bookings data
const mockBookings = [
  {
    id: '1',
    userId: '1',
    hotelId: '1',
    roomId: '1',
    hotelName: 'Grand Ocean Resort',
    roomName: 'Deluxe Ocean View',
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    guests: 2,
    totalPrice: 1250,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-03-01',
  },
  {
    id: '2',
    userId: '1',
    hotelId: '2',
    roomId: '3',
    hotelName: 'Mountain View Lodge',
    roomName: 'Standard Room',
    checkIn: '2024-04-10',
    checkOut: '2024-04-12',
    guests: 2,
    totalPrice: 300,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-03-10',
  },
];

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    const { roomId, hotelId, checkIn, checkOut, guests, specialRequests } = req.body;

    // TODO: Verify room exists and is available
    // const room = await Room.findById(roomId).populate('hotel');
    // if (!room) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Room not found',
    //   });
    // }

    // TODO: Check availability for the dates
    // const existingBooking = await Booking.findOne({
    //   room: roomId,
    //   status: { $ne: 'cancelled' },
    //   $or: [
    //     { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
    //     { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
    //   ],
    // });
    // if (existingBooking) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Room is not available for these dates',
    //   });
    // }

    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const pricePerNight = 200; // TODO: Get from room.price
    const totalPrice = nights * pricePerNight;

    // TODO: Create booking in database
    // const booking = await Booking.create({
    //   user: req.user.id,
    //   room: roomId,
    //   hotel: hotelId,
    //   checkIn: checkInDate,
    //   checkOut: checkOutDate,
    //   guests,
    //   totalPrice,
    //   specialRequests,
    //   status: 'pending',
    //   paymentStatus: 'pending',
    // });

    const newBooking = {
      id: Date.now().toString(),
      userId: req.user.id,
      hotelId,
      roomId,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      specialRequests,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
    };

    // TODO: Send confirmation email
    // await sendEmail({
    //   to: req.user.email,
    //   subject: 'Booking Confirmation',
    //   template: 'booking-confirmation',
    //   data: { booking: newBooking },
    // });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully. Confirmation email sent.',
      data: { booking: newBooking },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message,
    });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
export const getMyBookings = async (req, res) => {
  try {
    const { status, upcoming } = req.query;

    // TODO: Fetch user's bookings from database
    // let query = Booking.find({ user: req.user.id })
    //   .populate('room')
    //   .populate('hotel')
    //   .sort('-createdAt');
    
    // if (status) {
    //   query = query.where('status').equals(status);
    // }
    // if (upcoming === 'true') {
    //   query = query.where('checkIn').gte(new Date());
    // }
    
    // const bookings = await query;

    let bookings = mockBookings.filter(b => b.userId === req.user.id);
    
    if (status) {
      bookings = bookings.filter(b => b.status === status);
    }
    if (upcoming === 'true') {
      bookings = bookings.filter(b => new Date(b.checkIn) >= new Date());
    }

    res.json({
      success: true,
      data: { bookings },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message,
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Fetch booking from database
    // const booking = await Booking.findById(id)
    //   .populate('room')
    //   .populate('hotel')
    //   .populate('user', 'name email');
    
    // if (!booking) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Booking not found',
    //   });
    // }

    // // Check if user owns this booking or is admin
    // if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to view this booking',
    //   });
    // }

    const booking = mockBookings.find(b => b.id === id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.json({
      success: true,
      data: { booking },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message,
    });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, guests, specialRequests } = req.body;

    // TODO: Fetch booking from database
    // const booking = await Booking.findById(id);
    // if (!booking) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Booking not found',
    //   });
    // }

    // // Check ownership
    // if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to update this booking',
    //   });
    // }

    // // Check if booking can be modified
    // if (booking.status === 'completed' || booking.status === 'cancelled') {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Cannot modify a completed or cancelled booking',
    //   });
    // }

    // TODO: If dates changed, check availability
    // TODO: Recalculate price if dates changed
    // TODO: Update booking in database
    // booking.checkIn = checkIn || booking.checkIn;
    // booking.checkOut = checkOut || booking.checkOut;
    // booking.guests = guests || booking.guests;
    // booking.specialRequests = specialRequests || booking.specialRequests;
    // await booking.save();

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: { booking: { id, ...req.body } },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking',
      error: error.message,
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    // TODO: Fetch booking and validate
    // const booking = await Booking.findById(id);
    // if (!booking) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Booking not found',
    //   });
    // }

    // // Check ownership
    // if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to cancel this booking',
    //   });
    // }

    // // Check if booking can be cancelled
    // if (booking.status === 'completed' || booking.status === 'cancelled') {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Cannot cancel this booking',
    //   });
    // }

    // // Check cancellation policy (e.g., 24 hours before check-in)
    // const checkInDate = new Date(booking.checkIn);
    // const now = new Date();
    // const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);
    // if (hoursUntilCheckIn < 24) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Cannot cancel within 24 hours of check-in',
    //   });
    // }

    // TODO: Update booking status
    // booking.status = 'cancelled';
    // booking.cancellationReason = reason;
    // booking.cancelledAt = new Date();
    // await booking.save();

    // TODO: Process refund if applicable
    // TODO: Send cancellation email

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message,
    });
  }
};

// @desc    Process payment for booking (simulated)
// @route   POST /api/bookings/:id/pay
// @access  Private
export const processPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod, cardDetails } = req.body;

    // TODO: Fetch booking
    // const booking = await Booking.findById(id);
    // if (!booking) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Booking not found',
    //   });
    // }

    // TODO: Integrate with payment gateway (Stripe, etc.)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: booking.totalPrice * 100,
    //   currency: 'usd',
    //   payment_method: paymentMethod,
    //   confirm: true,
    // });

    // Simulated payment processing
    const paymentResult = {
      success: true,
      transactionId: `TXN-${Date.now()}`,
      amount: 1000, // TODO: Get from booking
      method: paymentMethod || 'card',
    };

    // TODO: Update booking payment status
    // booking.paymentStatus = 'paid';
    // booking.status = 'confirmed';
    // booking.transactionId = paymentResult.transactionId;
    // await booking.save();

    // TODO: Send confirmation email

    res.json({
      success: true,
      message: 'Payment processed successfully',
      data: { payment: paymentResult },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing payment',
      error: error.message,
    });
  }
};

// @desc    Get user booking statistics
// @route   GET /api/bookings/stats
// @access  Private
export const getBookingStats = async (req, res) => {
  try {
    // TODO: Calculate statistics from database
    // const stats = await Booking.aggregate([
    //   { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
    //   {
    //     $group: {
    //       _id: null,
    //       totalBookings: { $sum: 1 },
    //       totalSpent: { $sum: '$totalPrice' },
    //       totalNights: {
    //         $sum: {
    //           $divide: [
    //             { $subtract: ['$checkOut', '$checkIn'] },
    //             1000 * 60 * 60 * 24,
    //           ],
    //         },
    //       },
    //     },
    //   },
    // ]);

    // Mock statistics
    const stats = {
      totalBookings: 5,
      totalSpent: 2500,
      totalNights: 12,
      completedStays: 3,
      upcomingBookings: 2,
    };

    res.json({
      success: true,
      data: { stats },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message,
    });
  }
};
