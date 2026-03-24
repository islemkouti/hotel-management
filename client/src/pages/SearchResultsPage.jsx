import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import HotelCard from '../components/hotels/HotelCard';
import FilterSidebar from '../components/search/FilterSidebar';

// Mock search results
const mockHotels = [
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
  {
    id: '5',
    name: 'Urban Boutique Hotel',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    pricePerNight: 195,
    rating: 4.4,
    reviewCount: 189,
  },
  {
    id: '6',
    name: 'Lakeside Retreat',
    location: 'Lake Tahoe, CA',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    pricePerNight: 275,
    rating: 4.7,
    reviewCount: 234,
  },
];

function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState(mockHotels);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    amenities: [],
  });
  const [sortBy, setSortBy] = useState('recommended');

  const location = searchParams.get('location') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || '';

  const handleSearch = (newParams) => {
    const params = new URLSearchParams();
    if (newParams.location) params.set('location', newParams.location);
    if (newParams.checkIn) params.set('checkIn', newParams.checkIn);
    if (newParams.checkOut) params.set('checkOut', newParams.checkOut);
    if (newParams.guests) params.set('guests', newParams.guests);
    if (newParams.rooms) params.set('rooms', newParams.rooms);
    setSearchParams(params);
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to hotels
    let filtered = [...mockHotels];
    
    if (newFilters.minPrice) {
      filtered = filtered.filter(h => h.pricePerNight >= newFilters.minPrice);
    }
    if (newFilters.maxPrice) {
      filtered = filtered.filter(h => h.pricePerNight <= newFilters.maxPrice);
    }
    if (newFilters.rating) {
      filtered = filtered.filter(h => h.rating >= newFilters.rating);
    }
    if (location) {
      filtered = filtered.filter(h => 
        h.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setHotels(filtered);
  };

  useEffect(() => {
    applyFilters(filters);
  }, [sortBy, location]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar 
            onSearch={handleSearch}
            initialValues={{
              location,
              checkIn: checkIn ? new Date(checkIn) : null,
              checkOut: checkOut ? new Date(checkOut) : null,
              adults: parseInt(guests) || 2,
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {location ? `Hotels in ${location}` : 'All Hotels'}
            </h1>
            <p className="text-gray-600 mt-1">{hotels.length} properties found</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden btn btn-secondary flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input py-2 px-3 pr-10 w-auto"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar 
              filters={filters}
              onFilterChange={applyFilters}
            />
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : hotels.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setFilters({ minPrice: 0, maxPrice: 1000, rating: 0, amenities: [] });
                    setHotels(mockHotels);
                  }}
                  className="btn btn-secondary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar 
                filters={filters}
                onFilterChange={(newFilters) => {
                  applyFilters(newFilters);
                  setShowMobileFilters(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
