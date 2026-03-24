// Mock data for development
const mockHotels = [
  {
    id: '1',
    name: 'Grand Ocean Resort',
    description: 'Luxurious beachfront resort with stunning ocean views.',
    location: 'Miami Beach, FL',
    address: '123 Ocean Drive, Miami Beach, FL 33139',
    images: ['/images/hotel1.jpg', '/images/hotel1-2.jpg'],
    pricePerNight: 250,
    rating: 4.8,
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi', 'Gym', 'Beach Access'],
    totalRooms: 150,
    featured: true,
  },
  {
    id: '2',
    name: 'Mountain View Lodge',
    description: 'Cozy mountain retreat perfect for nature lovers.',
    location: 'Aspen, CO',
    address: '456 Mountain Road, Aspen, CO 81611',
    images: ['/images/hotel2.jpg'],
    pricePerNight: 180,
    rating: 4.5,
    amenities: ['Fireplace', 'Ski Storage', 'Restaurant', 'WiFi', 'Hot Tub'],
    totalRooms: 50,
    featured: true,
  },
  {
    id: '3',
    name: 'City Center Hotel',
    description: 'Modern hotel in the heart of downtown.',
    location: 'New York, NY',
    address: '789 Broadway, New York, NY 10003',
    images: ['/images/hotel3.jpg'],
    pricePerNight: 320,
    rating: 4.6,
    amenities: ['Restaurant', 'Bar', 'WiFi', 'Gym', 'Concierge'],
    totalRooms: 200,
    featured: true,
  },
];

// @desc    Get all hotels with search and filters
// @route   GET /api/hotels
// @access  Public
export const getHotels = async (req, res) => {
  try {
    const {
      location,
      checkIn,
      checkOut,
      guests,
      rooms,
      minPrice,
      maxPrice,
      rating,
      amenities,
      page = 1,
      limit = 10,
      sort = '-rating',
    } = req.query;

    // TODO: Fetch hotels from database with filters
    // let query = Hotel.find();
    
    // if (location) {
    //   query = query.where('location').regex(new RegExp(location, 'i'));
    // }
    // if (minPrice) {
    //   query = query.where('pricePerNight').gte(minPrice);
    // }
    // if (maxPrice) {
    //   query = query.where('pricePerNight').lte(maxPrice);
    // }
    // if (rating) {
    //   query = query.where('rating').gte(rating);
    // }
    // if (amenities) {
    //   query = query.where('amenities').all(amenities.split(','));
    // }
    
    // TODO: Check room availability for given dates
    // if (checkIn && checkOut) {
    //   // Filter hotels with available rooms for the date range
    // }

    // Pagination
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(parseInt(limit));
    // query = query.sort(sort);
    
    // const hotels = await query;
    // const total = await Hotel.countDocuments();

    // Filter mock data
    let filteredHotels = [...mockHotels];
    
    if (location) {
      filteredHotels = filteredHotels.filter(h => 
        h.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    if (minPrice) {
      filteredHotels = filteredHotels.filter(h => h.pricePerNight >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredHotels = filteredHotels.filter(h => h.pricePerNight <= parseFloat(maxPrice));
    }
    if (rating) {
      filteredHotels = filteredHotels.filter(h => h.rating >= parseFloat(rating));
    }

    res.json({
      success: true,
      data: {
        hotels: filteredHotels,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: filteredHotels.length,
          pages: Math.ceil(filteredHotels.length / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hotels',
      error: error.message,
    });
  }
};

// @desc    Get featured hotels
// @route   GET /api/hotels/featured
// @access  Public
export const getFeaturedHotels = async (req, res) => {
  try {
    // TODO: Fetch featured hotels from database
    // const hotels = await Hotel.find({ featured: true }).limit(6);

    const featured = mockHotels.filter(h => h.featured);

    res.json({
      success: true,
      data: { hotels: featured },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured hotels',
      error: error.message,
    });
  }
};

// @desc    Get single hotel by ID
// @route   GET /api/hotels/:id
// @access  Public
export const getHotel = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Fetch hotel from database with rooms and reviews
    // const hotel = await Hotel.findById(id)
    //   .populate('rooms')
    //   .populate({
    //     path: 'reviews',
    //     populate: { path: 'user', select: 'name' }
    //   });
    // if (!hotel) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Hotel not found',
    //   });
    // }

    const hotel = mockHotels.find(h => h.id === id);
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      });
    }

    res.json({
      success: true,
      data: { hotel },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hotel',
      error: error.message,
    });
  }
};

// @desc    Create new hotel (Admin only)
// @route   POST /api/hotels
// @access  Private/Admin
export const createHotel = async (req, res) => {
  try {
    const { name, description, location, address, images, pricePerNight, amenities } = req.body;

    // TODO: Create hotel in database
    // const hotel = await Hotel.create({
    //   name,
    //   description,
    //   location,
    //   address,
    //   images,
    //   pricePerNight,
    //   amenities,
    //   createdBy: req.user.id,
    // });

    const newHotel = {
      id: Date.now().toString(),
      name,
      description,
      location,
      address,
      images: images || [],
      pricePerNight,
      amenities: amenities || [],
      rating: 0,
      totalRooms: 0,
      featured: false,
    };

    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: { hotel: newHotel },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating hotel',
      error: error.message,
    });
  }
};

// @desc    Update hotel (Admin only)
// @route   PUT /api/hotels/:id
// @access  Private/Admin
export const updateHotel = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Update hotel in database
    // const hotel = await Hotel.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // if (!hotel) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Hotel not found',
    //   });
    // }

    res.json({
      success: true,
      message: 'Hotel updated successfully',
      data: { hotel: { id, ...req.body } },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating hotel',
      error: error.message,
    });
  }
};

// @desc    Delete hotel (Admin only)
// @route   DELETE /api/hotels/:id
// @access  Private/Admin
export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Delete hotel from database
    // const hotel = await Hotel.findByIdAndDelete(id);
    // if (!hotel) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Hotel not found',
    //   });
    // }

    // TODO: Also delete associated rooms and bookings
    // await Room.deleteMany({ hotel: id });
    // await Booking.deleteMany({ hotel: id });

    res.json({
      success: true,
      message: 'Hotel deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting hotel',
      error: error.message,
    });
  }
};

// @desc    Get hotel availability calendar
// @route   GET /api/hotels/:id/availability
// @access  Public
export const getHotelAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { month, year } = req.query;

    // TODO: Fetch bookings for the hotel and calculate availability
    // const startDate = new Date(year, month - 1, 1);
    // const endDate = new Date(year, month, 0);
    // const bookings = await Booking.find({
    //   hotel: id,
    //   checkIn: { $lte: endDate },
    //   checkOut: { $gte: startDate },
    // });

    // Mock availability data
    const availability = {
      hotelId: id,
      month: month || new Date().getMonth() + 1,
      year: year || new Date().getFullYear(),
      // Array of dates with availability status
      dates: Array.from({ length: 31 }, (_, i) => ({
        date: i + 1,
        available: Math.random() > 0.3,
        minPrice: 150 + Math.floor(Math.random() * 100),
      })),
    };

    res.json({
      success: true,
      data: { availability },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching availability',
      error: error.message,
    });
  }
};
