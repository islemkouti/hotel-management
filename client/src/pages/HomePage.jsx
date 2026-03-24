import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import HotelCard from '../components/hotels/HotelCard';
import { MapPin, Shield, Star, Clock } from 'lucide-react';

// Mock featured hotels
const featuredHotels = [
  {
    id: '1',
    name: 'Grand Ocean Resort',
    location: 'Miami Beach, FL',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    pricePerNight: 250,
    rating: 4.8,
    reviewCount: 328,
  },
  {
    id: '2',
    name: 'Mountain View Lodge',
    location: 'Aspen, CO',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    pricePerNight: 180,
    rating: 4.5,
    reviewCount: 156,
  },
  {
    id: '3',
    name: 'City Center Hotel',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    pricePerNight: 320,
    rating: 4.6,
    reviewCount: 482,
  },
  {
    id: '4',
    name: 'Sunset Beach Resort',
    location: 'Malibu, CA',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    pricePerNight: 420,
    rating: 4.9,
    reviewCount: 267,
  },
];

const destinations = [
  { name: 'Miami', image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&q=80', count: 234 },
  { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80', count: 512 },
  { name: 'Los Angeles', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=400&q=80', count: 378 },
  { name: 'Las Vegas', image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=400&q=80', count: 289 },
];

function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (searchParams) => {
    const params = new URLSearchParams();
    if (searchParams.location) params.set('location', searchParams.location);
    if (searchParams.checkIn) params.set('checkIn', searchParams.checkIn);
    if (searchParams.checkOut) params.set('checkOut', searchParams.checkOut);
    if (searchParams.guests) params.set('guests', searchParams.guests);
    if (searchParams.rooms) params.set('rooms', searchParams.rooms);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              Find your perfect stay
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
              Search deals on hotels, homes, and much more. Discover your next great adventure.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-brand" />
              </div>
              <h3 className="font-semibold text-gray-900">Best Price Guarantee</h3>
              <p className="text-sm text-gray-600 mt-1">Find a lower price? We will match it.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-brand" />
              </div>
              <h3 className="font-semibold text-gray-900">Verified Reviews</h3>
              <p className="text-sm text-gray-600 mt-1">Real reviews from real guests.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-brand" />
              </div>
              <h3 className="font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600 mt-1">Here for you anytime you need.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-brand" />
              </div>
              <h3 className="font-semibold text-gray-900">Wide Selection</h3>
              <p className="text-sm text-gray-600 mt-1">1M+ properties worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Featured Hotels</h2>
              <p className="text-gray-600 mt-1">Hand-picked selections for your next getaway</p>
            </div>
            <button 
              onClick={() => navigate('/search')}
              className="text-brand font-medium hover:underline hidden sm:block"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8">Popular Destinations</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinations.map((destination) => (
              <button
                key={destination.name}
                onClick={() => navigate(`/search?location=${destination.name}`)}
                className="group relative rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">{destination.name}</h3>
                  <p className="text-sm text-gray-200">{destination.count} properties</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your adventure?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust StayBook for their perfect stays worldwide.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-brand px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started - It is free
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
