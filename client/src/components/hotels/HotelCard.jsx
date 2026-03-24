import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, MapPin } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import toast from 'react-hot-toast';

function HotelCard({ hotel, onFavoriteToggle }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(hotel.isFavorite || false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to save favorites');
      navigate('/login');
      return;
    }
    setIsFavorite(!isFavorite);
    onFavoriteToggle?.(hotel.id, !isFavorite);
  };

  const handleClick = () => {
    navigate(`/hotels/${hotel.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
        <img
          src={imageError ? '/placeholder-hotel.jpg' : hotel.image}
          alt={hotel.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-brand text-brand' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors line-clamp-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
            {hotel.reviewCount && (
              <span className="text-sm text-gray-500">({hotel.reviewCount})</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        <p className="text-gray-900">
          <span className="font-semibold">${hotel.pricePerNight}</span>
          <span className="text-gray-500"> / night</span>
        </p>
      </div>
    </div>
  );
}

export default HotelCard;
