import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Star, Wifi, Car, Coffee, Waves, Dumbbell, Utensils, Wind, Tv, ChevronLeft, ChevronRight, Calendar, Users, X } from 'lucide-react';
import api from '../services/api';
import useAuthStore from '../stores/authStore';
import RoomCard from '../components/hotels/RoomCard';
import ReviewSection from '../components/reviews/ReviewSection';
import BookingModal from '../components/booking/BookingModal';
import ImageGallery from '../components/hotels/ImageGallery';

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
  pool: Waves,
  gym: Dumbbell,
  restaurant: Utensils,
  ac: Wind,
  tv: Tv,
};

export default function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuthStore();
  
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get search params for booking
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = parseInt(searchParams.get('guests')) || 2;

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      const [hotelRes, roomsRes, reviewsRes] = await Promise.all([
        api.get(`/hotels/${id}`),
        api.get(`/rooms/hotel/${id}`),
        api.get(`/reviews/hotel/${id}`),
      ]);
      setHotel(hotelRes.data.data);
      setRooms(roomsRes.data.data || []);
      setReviews(reviewsRes.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load hotel details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRoom = (room) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/hotel/${id}` } });
      return;
    }
    setSelectedRoom(room);
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Hotel Not Found</h2>
          <p className="text-slate-600 mb-4">{error || 'The hotel you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const images = hotel.images?.length > 0 ? hotel.images : [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Image Gallery Header */}
      <div className="relative h-[400px] md:h-[500px]">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full p-2">
          <div 
            className="col-span-2 row-span-2 relative cursor-pointer group"
            onClick={() => { setCurrentImageIndex(0); setShowGallery(true); }}
          >
            <img
              src={images[0]}
              alt={hotel.name}
              className="w-full h-full object-cover rounded-l-xl"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-l-xl" />
          </div>
          {images.slice(1, 5).map((img, idx) => (
            <div 
              key={idx}
              className={`relative cursor-pointer group ${idx === 1 ? 'rounded-tr-xl' : ''} ${idx === 3 ? 'rounded-br-xl' : ''}`}
              onClick={() => { setCurrentImageIndex(idx + 1); setShowGallery(true); }}
            >
              <img
                src={img}
                alt={`${hotel.name} ${idx + 2}`}
                className={`w-full h-full object-cover ${idx === 1 ? 'rounded-tr-xl' : ''} ${idx === 3 ? 'rounded-br-xl' : ''}`}
              />
              <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors ${idx === 1 ? 'rounded-tr-xl' : ''} ${idx === 3 ? 'rounded-br-xl' : ''}`} />
              {idx === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-br-xl">
                  <span className="text-white text-lg font-semibold">+{images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowGallery(true)}
          className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow font-medium"
        >
          View all photos
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center gap-4 text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hotel.location?.address}, {hotel.location?.city}, {hotel.location?.country}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-lg">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-900">{hotel.rating?.toFixed(1) || '4.5'}</span>
                  <span className="text-slate-500">({hotel.reviewCount || reviews.length} reviews)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {hotel.propertyType && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm capitalize">
                    {hotel.propertyType}
                  </span>
                )}
                {hotel.starRating && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm flex items-center gap-1">
                    {hotel.starRating} <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Star
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">About this property</h2>
              <p className="text-slate-600 leading-relaxed">
                {hotel.description || 'Experience luxury and comfort at our beautiful property. Perfectly located to explore the city while enjoying world-class amenities and exceptional service. Our dedicated staff ensures every guest has an unforgettable stay.'}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(hotel.amenities || ['wifi', 'parking', 'pool', 'gym', 'restaurant', 'ac']).map((amenity) => {
                  const Icon = amenityIcons[amenity.toLowerCase()] || Wifi;
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                      <Icon className="h-5 w-5 text-teal-600" />
                      <span className="text-slate-700 capitalize">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available Rooms */}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Available Rooms</h2>
              <div className="space-y-4">
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <RoomCard
                      key={room._id}
                      room={room}
                      onBook={() => handleBookRoom(room)}
                      checkIn={checkIn}
                      checkOut={checkOut}
                    />
                  ))
                ) : (
                  // Placeholder rooms
                  [
                    { _id: '1', name: 'Deluxe Room', type: 'deluxe', price: 150, capacity: 2, size: 35, amenities: ['wifi', 'ac', 'tv'], images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'] },
                    { _id: '2', name: 'Suite', type: 'suite', price: 280, capacity: 4, size: 55, amenities: ['wifi', 'ac', 'tv', 'minibar'], images: ['https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400'] },
                    { _id: '3', name: 'Standard Room', type: 'standard', price: 100, capacity: 2, size: 25, amenities: ['wifi', 'ac'], images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400'] },
                  ].map((room) => (
                    <RoomCard
                      key={room._id}
                      room={room}
                      onBook={() => handleBookRoom(room)}
                      checkIn={checkIn}
                      checkOut={checkOut}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Reviews */}
            <ReviewSection 
              reviews={reviews} 
              hotelId={id} 
              onReviewAdded={fetchHotelDetails}
            />
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">
                      ${hotel.priceRange?.min || 100}
                    </span>
                    <span className="text-slate-500"> / night</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="font-medium">{hotel.rating?.toFixed(1) || '4.5'}</span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg mb-4">
                  <div className="grid grid-cols-2 divide-x divide-slate-200">
                    <div className="p-3">
                      <label className="block text-xs font-medium text-slate-500 mb-1">CHECK-IN</label>
                      <input
                        type="date"
                        defaultValue={checkIn}
                        className="w-full text-sm text-slate-900 bg-transparent focus:outline-none"
                      />
                    </div>
                    <div className="p-3">
                      <label className="block text-xs font-medium text-slate-500 mb-1">CHECK-OUT</label>
                      <input
                        type="date"
                        defaultValue={checkOut}
                        className="w-full text-sm text-slate-900 bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="border-t border-slate-200 p-3">
                    <label className="block text-xs font-medium text-slate-500 mb-1">GUESTS</label>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-900">{guests} guests</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (rooms.length > 0) {
                      handleBookRoom(rooms[0]);
                    } else {
                      handleBookRoom({ _id: '1', name: 'Deluxe Room', price: 150 });
                    }
                  }}
                  className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors mb-3"
                >
                  Reserve
                </button>

                <p className="text-center text-sm text-slate-500">You won't be charged yet</p>

                <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                  <div className="flex justify-between text-slate-600">
                    <span>${hotel.priceRange?.min || 100} x 1 night</span>
                    <span>${hotel.priceRange?.min || 100}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Service fee</span>
                    <span>$15</span>
                  </div>
                  <div className="flex justify-between font-semibold text-slate-900 pt-3 border-t border-slate-200">
                    <span>Total</span>
                    <span>${(hotel.priceRange?.min || 100) + 15}</span>
                  </div>
                </div>
              </div>

              {/* Hotel Policies */}
              <div className="mt-6 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Hotel Policies</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Check-in</span>
                    <span className="text-slate-900">{hotel.policies?.checkInTime || '3:00 PM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Check-out</span>
                    <span className="text-slate-900">{hotel.policies?.checkOutTime || '11:00 AM'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cancellation</span>
                    <span className="text-slate-900 text-right max-w-[150px]">{hotel.policies?.cancellationPolicy || 'Free cancellation up to 24h'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showGallery && (
        <ImageGallery
          images={images}
          currentIndex={currentImageIndex}
          onClose={() => setShowGallery(false)}
          onIndexChange={setCurrentImageIndex}
        />
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedRoom && (
        <BookingModal
          hotel={hotel}
          room={selectedRoom}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
