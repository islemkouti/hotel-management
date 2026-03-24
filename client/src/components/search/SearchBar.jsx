import { useState } from 'react';
import { MapPin, Calendar, Users, Search, Minus, Plus } from 'lucide-react';
import { format, addDays } from 'date-fns';
import DatePicker from './DatePicker';

function SearchBar({ onSearch, initialValues = {} }) {
  const [location, setLocation] = useState(initialValues.location || '');
  const [checkIn, setCheckIn] = useState(initialValues.checkIn || null);
  const [checkOut, setCheckOut] = useState(initialValues.checkOut || null);
  const [guests, setGuests] = useState({
    adults: initialValues.adults || 2,
    children: initialValues.children || 0,
    rooms: initialValues.rooms || 1,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('checkIn');

  const handleDateSelect = (date) => {
    if (datePickerMode === 'checkIn') {
      setCheckIn(date);
      if (checkOut && date >= checkOut) {
        setCheckOut(addDays(date, 1));
      }
      setDatePickerMode('checkOut');
    } else {
      setCheckOut(date);
      setShowDatePicker(false);
    }
  };

  const updateGuests = (type, increment) => {
    setGuests(prev => ({
      ...prev,
      [type]: Math.max(type === 'children' ? 0 : 1, prev[type] + increment),
    }));
  };

  const handleSearch = () => {
    onSearch({
      location,
      checkIn: checkIn ? format(checkIn, 'yyyy-MM-dd') : null,
      checkOut: checkOut ? format(checkOut, 'yyyy-MM-dd') : null,
      guests: guests.adults + guests.children,
      rooms: guests.rooms,
    });
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-2">
      <div className="flex flex-col lg:flex-row lg:items-center">
        {/* Location */}
        <div className="flex-1 p-3 lg:border-r border-gray-200">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-1">
            Location
          </label>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you going?"
              className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="flex-1 p-3 lg:border-r border-gray-200 relative">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-1">
            Check in
          </label>
          <button
            onClick={() => {
              setDatePickerMode('checkIn');
              setShowDatePicker(true);
              setShowGuestPicker(false);
            }}
            className="flex items-center gap-2 w-full text-left"
          >
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className={checkIn ? 'text-gray-900' : 'text-gray-400'}>
              {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Add dates'}
            </span>
          </button>
        </div>

        {/* Check-out */}
        <div className="flex-1 p-3 lg:border-r border-gray-200 relative">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-1">
            Check out
          </label>
          <button
            onClick={() => {
              setDatePickerMode('checkOut');
              setShowDatePicker(true);
              setShowGuestPicker(false);
            }}
            className="flex items-center gap-2 w-full text-left"
          >
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className={checkOut ? 'text-gray-900' : 'text-gray-400'}>
              {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Add dates'}
            </span>
          </button>
        </div>

        {/* Guests */}
        <div className="flex-1 p-3 relative">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-1">
            Travelers
          </label>
          <button
            onClick={() => {
              setShowGuestPicker(!showGuestPicker);
              setShowDatePicker(false);
            }}
            className="flex items-center gap-2 w-full text-left"
          >
            <Users className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">
              {totalGuests} guest{totalGuests !== 1 ? 's' : ''}, {guests.rooms} room{guests.rooms !== 1 ? 's' : ''}
            </span>
          </button>

          {/* Guest Picker Dropdown */}
          {showGuestPicker && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowGuestPicker(false)} />
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-20">
                {/* Adults */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Adults</p>
                    <p className="text-sm text-gray-500">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateGuests('adults', -1)}
                      disabled={guests.adults <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-medium">{guests.adults}</span>
                    <button
                      onClick={() => updateGuests('adults', 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Children</p>
                    <p className="text-sm text-gray-500">Ages 2-12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateGuests('children', -1)}
                      disabled={guests.children <= 0}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-medium">{guests.children}</span>
                    <button
                      onClick={() => updateGuests('children', 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Rooms</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateGuests('rooms', -1)}
                      disabled={guests.rooms <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-medium">{guests.rooms}</span>
                    <button
                      onClick={() => updateGuests('rooms', 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowGuestPicker(false)}
                  className="w-full mt-4 btn btn-primary"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="m-2 btn btn-primary px-6 py-4 lg:py-3"
        >
          <Search className="w-5 h-5 lg:mr-2" />
          <span className="hidden lg:inline">Search</span>
        </button>
      </div>

      {/* Date Picker */}
      {showDatePicker && (
        <DatePicker
          selectedDate={datePickerMode === 'checkIn' ? checkIn : checkOut}
          onSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
          minDate={datePickerMode === 'checkOut' && checkIn ? addDays(checkIn, 1) : new Date()}
          mode={datePickerMode}
        />
      )}
    </div>
  );
}

export default SearchBar;
