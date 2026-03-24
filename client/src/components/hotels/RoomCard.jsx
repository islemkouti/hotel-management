import { Users, Maximize, Wifi, Wind, Tv, Coffee, Check } from 'lucide-react';

const amenityIcons = {
  wifi: Wifi,
  ac: Wind,
  tv: Tv,
  minibar: Coffee,
};

export default function RoomCard({ room, onBook, checkIn, checkOut }) {
  const nights = checkIn && checkOut 
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 1;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Room Image */}
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img
            src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400'}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          {room.availableCount <= 3 && room.availableCount > 0 && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
              Only {room.availableCount} left
            </div>
          )}
        </div>

        {/* Room Details */}
        <div className="flex-1 p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{room.name}</h3>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Up to {room.capacity} guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize className="h-4 w-4" />
                  <span>{room.size || 30} m²</span>
                </div>
              </div>

              <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                {room.description || 'Comfortable room with modern amenities and beautiful views. Perfect for both business and leisure travelers.'}
              </p>

              {/* Room Amenities */}
              <div className="flex flex-wrap gap-2">
                {(room.amenities || ['wifi', 'ac', 'tv']).slice(0, 4).map((amenity) => {
                  const Icon = amenityIcons[amenity.toLowerCase()] || Check;
                  return (
                    <div key={amenity} className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded">
                      <Icon className="h-3 w-3" />
                      <span className="capitalize">{amenity}</span>
                    </div>
                  );
                })}
                {room.amenities?.length > 4 && (
                  <span className="text-xs text-teal-600">+{room.amenities.length - 4} more</span>
                )}
              </div>
            </div>

            {/* Price & Book */}
            <div className="md:text-right md:min-w-[140px]">
              <div className="mb-3">
                <span className="text-2xl font-bold text-slate-900">${room.price}</span>
                <span className="text-slate-500 text-sm"> / night</span>
              </div>
              {nights > 1 && (
                <p className="text-sm text-slate-500 mb-3">
                  ${room.price * nights} total for {nights} nights
                </p>
              )}
              <button
                onClick={onBook}
                className="w-full md:w-auto px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Book Now
              </button>
              <p className="text-xs text-slate-400 mt-2">Free cancellation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
