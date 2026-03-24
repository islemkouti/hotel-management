// Mock rooms data
const mockRooms = [
  {
    id: '1',
    hotelId: '1',
    name: 'Deluxe Ocean View',
    type: 'deluxe',
    description: 'Spacious room with stunning ocean views.',
    price: 250,
    capacity: 2,
    beds: '1 King Bed',
    size: 45,
    amenities: ['Ocean View', 'Balcony', 'Mini Bar', 'WiFi', 'AC'],
    images: ['/images/room1.jpg'],
    available: true,
  },
  {
    id: '2',
    hotelId: '1',
    name: 'Premium Suite',
    type: 'suite',
    description: 'Luxurious suite with separate living area.',
    price: 450,
    capacity: 4,
    beds: '1 King Bed + Sofa Bed',
    size: 75,
    amenities: ['Ocean View', 'Balcony', 'Mini Bar', 'WiFi', 'AC', 'Jacuzzi'],
    images: ['/images/room2.jpg'],
    available: true,
  },
  {
    id: '3',
    hotelId: '1',
    name: 'Standard Room',
    type: 'standard',
    description: 'Comfortable room with all essential amenities.',
    price: 150,
    capacity: 2,
    beds: '2 Queen Beds',
    size: 35,
    amenities: ['WiFi', 'AC', 'TV'],
    images: ['/images/room3.jpg'],
    available: true,
  },
];

// @desc    Get rooms by hotel
// @route   GET /api/rooms/hotel/:hotelId
// @access  Public
export const getRoomsByHotel = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { checkIn, checkOut, guests } = req.query;

    // TODO: Fetch rooms from database
    // let query = Room.find({ hotel: hotelId });
    
    // if (guests) {
    //   query = query.where('capacity').gte(guests);
    // }
    
    // TODO: Check availability for given dates
    // if (checkIn && checkOut) {
    //   const bookings = await Booking.find({
    //     room: { $in: roomIds },
    //     status: { $ne: 'cancelled' },
    //     $or: [
    //       { checkIn: { $lt: checkOut, $gte: checkIn } },
    //       { checkOut: { $gt: checkIn, $lte: checkOut } },
    //       { checkIn: { $lte: checkIn }, checkOut: { $gte: checkOut } },
    //     ],
    //   });
    //   // Filter out booked rooms
    // }
    
    // const rooms = await query;

    const rooms = mockRooms.filter(r => r.hotelId === hotelId);

    res.json({
      success: true,
      data: { rooms },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching rooms',
      error: error.message,
    });
  }
};

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
export const getRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Fetch room from database
    // const room = await Room.findById(id).populate('hotel');
    // if (!room) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Room not found',
    //   });
    // }

    const room = mockRooms.find(r => r.id === id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    res.json({
      success: true,
      data: { room },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching room',
      error: error.message,
    });
  }
};

// @desc    Check room availability
// @route   GET /api/rooms/:id/availability
// @access  Public
export const checkRoomAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut } = req.query;

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'Check-in and check-out dates are required',
      });
    }

    // TODO: Check bookings for this room in the date range
    // const bookings = await Booking.find({
    //   room: id,
    //   status: { $ne: 'cancelled' },
    //   $or: [
    //     { checkIn: { $lt: new Date(checkOut), $gte: new Date(checkIn) } },
    //     { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
    //     { checkIn: { $lte: new Date(checkIn) }, checkOut: { $gte: new Date(checkOut) } },
    //   ],
    // });
    // const isAvailable = bookings.length === 0;

    // Mock availability check
    const isAvailable = Math.random() > 0.2;

    res.json({
      success: true,
      data: {
        roomId: id,
        checkIn,
        checkOut,
        available: isAvailable,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking availability',
      error: error.message,
    });
  }
};

// @desc    Create room (Admin only)
// @route   POST /api/rooms
// @access  Private/Admin
export const createRoom = async (req, res) => {
  try {
    const { hotelId, name, type, description, price, capacity, beds, size, amenities, images } = req.body;

    // TODO: Verify hotel exists
    // const hotel = await Hotel.findById(hotelId);
    // if (!hotel) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Hotel not found',
    //   });
    // }

    // TODO: Create room in database
    // const room = await Room.create({
    //   hotel: hotelId,
    //   name,
    //   type,
    //   description,
    //   price,
    //   capacity,
    //   beds,
    //   size,
    //   amenities,
    //   images,
    // });

    // TODO: Update hotel room count
    // await Hotel.findByIdAndUpdate(hotelId, { $inc: { totalRooms: 1 } });

    const newRoom = {
      id: Date.now().toString(),
      hotelId,
      name,
      type,
      description,
      price,
      capacity,
      beds,
      size,
      amenities: amenities || [],
      images: images || [],
      available: true,
    };

    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: { room: newRoom },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating room',
      error: error.message,
    });
  }
};

// @desc    Update room (Admin only)
// @route   PUT /api/rooms/:id
// @access  Private/Admin
export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Update room in database
    // const room = await Room.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // if (!room) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Room not found',
    //   });
    // }

    res.json({
      success: true,
      message: 'Room updated successfully',
      data: { room: { id, ...req.body } },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating room',
      error: error.message,
    });
  }
};

// @desc    Delete room (Admin only)
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Check for active bookings
    // const activeBookings = await Booking.find({
    //   room: id,
    //   status: { $in: ['pending', 'confirmed'] },
    //   checkOut: { $gte: new Date() },
    // });
    // if (activeBookings.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Cannot delete room with active bookings',
    //   });
    // }

    // TODO: Delete room from database
    // const room = await Room.findByIdAndDelete(id);
    // if (!room) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Room not found',
    //   });
    // }

    // TODO: Update hotel room count
    // await Hotel.findByIdAndUpdate(room.hotel, { $inc: { totalRooms: -1 } });

    res.json({
      success: true,
      message: 'Room deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting room',
      error: error.message,
    });
  }
};
