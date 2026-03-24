import { useState } from 'react';
import { Star } from 'lucide-react';

const amenitiesList = [
  'WiFi',
  'Pool',
  'Spa',
  'Restaurant',
  'Gym',
  'Parking',
  'Pet Friendly',
  'Beach Access',
  'Air Conditioning',
  'Kitchen',
];

function FilterSidebar({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handlePriceChange = (type, value) => {
    const newFilters = {
      ...localFilters,
      [type]: parseInt(value) || 0,
    };
    setLocalFilters(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newFilters = {
      ...localFilters,
      rating: localFilters.rating === rating ? 0 : rating,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = localFilters.amenities.includes(amenity)
      ? localFilters.amenities.filter(a => a !== amenity)
      : [...localFilters.amenities, amenity];
    
    const newFilters = {
      ...localFilters,
      amenities: newAmenities,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const applyPriceFilter = () => {
    onFilterChange(localFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      minPrice: 0,
      maxPrice: 1000,
      rating: 0,
      amenities: [],
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Min</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={localFilters.minPrice}
                onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                onBlur={applyPriceFilter}
                className="input pl-7 py-2"
                min="0"
              />
            </div>
          </div>
          <span className="text-gray-400 mt-5">-</span>
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Max</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={localFilters.maxPrice}
                onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                onBlur={applyPriceFilter}
                className="input pl-7 py-2"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ${
                localFilters.rating === rating
                  ? 'bg-brand/10 border border-brand'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-700">& up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Amenities</h3>
        <div className="space-y-2">
          {amenitiesList.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={localFilters.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="w-4 h-4 rounded border-gray-300 text-brand focus:ring-brand"
              />
              <span className="text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearAllFilters}
        className="w-full py-2 text-gray-600 hover:text-gray-900 font-medium"
      >
        Clear all filters
      </button>
    </div>
  );
}

export default FilterSidebar;
