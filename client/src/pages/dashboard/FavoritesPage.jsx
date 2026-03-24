import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Trash2 } from 'lucide-react';
import api from '../../services/api';

const placeholderFavorites = [
  {
    _id: 'f1',
    hotel: {
      _id: 'h1',
      name: 'Grand Ocean Resort',
      location: { city: 'Miami', country: 'USA' },
      rating: 4.8,
      reviewCount: 234,
      priceRange: { min: 150 },
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'],
    },
  },
  {
    _id: 'f2',
    hotel: {
      _id: 'h2',
      name: 'Mountain View Lodge',
      location: { city: 'Denver', country: 'USA' },
      rating: 4.6,
      reviewCount: 156,
      priceRange: { min: 120 },
      images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'],
    },
  },
  {
    _id: 'f3',
    hotel: {
      _id: 'h3',
      name: 'City Center Hotel',
      location: { city: 'New York', country: 'USA' },
      rating: 4.5,
      reviewCount: 312,
      priceRange: { min: 180 },
      images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400'],
    },
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/favorites');
      setFavorites(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
      setFavorites(placeholderFavorites);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (favoriteId) => {
    try {
      await api.delete(`/users/favorites/${favoriteId}`);
      setFavorites(prev => prev.filter(f => f._id !== favoriteId));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  const displayFavorites = favorites.length > 0 ? favorites : placeholderFavorites;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Favorites</h1>
        <p className="text-slate-500">{displayFavorites.length} saved hotel{displayFavorites.length !== 1 ? 's' : ''}</p>
      </div>

      {displayFavorites.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No favorites yet</h3>
          <p className="text-slate-500 mb-4">Save hotels you love to find them easily later!</p>
          <Link
            to="/"
            className="inline-flex px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Browse Hotels
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayFavorites.map((favorite) => {
            const hotel = favorite.hotel;
            return (
              <div
                key={favorite._id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48">
                  <img
                    src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(favorite._id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Link 
                      to={`/hotel/${hotel._id}`}
                      className="font-semibold text-slate-900 hover:text-teal-600 transition-colors"
                    >
                      {hotel.name}
                    </Link>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="font-medium">{hotel.rating?.toFixed(1)}</span>
                      <span className="text-slate-400">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 flex items-center gap-1 mb-3">
                    <MapPin className="h-4 w-4" />
                    {hotel.location?.city}, {hotel.location?.country}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div>
                      <span className="text-lg font-bold text-slate-900">
                        ${hotel.priceRange?.min}
                      </span>
                      <span className="text-slate-500 text-sm"> / night</span>
                    </div>
                    <Link
                      to={`/hotel/${hotel._id}`}
                      className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
