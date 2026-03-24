import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, X, Eye, Download, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-slate-100 text-slate-700',
};

const placeholderBookings = [
  {
    _id: '1',
    hotel: { _id: 'h1', name: 'Grand Ocean Resort', location: { city: 'Miami', country: 'USA' }, images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'] },
    room: { name: 'Deluxe Ocean View' },
    checkIn: new Date(Date.now() + 86400000 * 14).toISOString(),
    checkOut: new Date(Date.now() + 86400000 * 17).toISOString(),
    guests: 2,
    totalPrice: 450,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: '2',
    hotel: { _id: 'h2', name: 'Mountain View Lodge', location: { city: 'Denver', country: 'USA' }, images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'] },
    room: { name: 'Standard Room' },
    checkIn: new Date(Date.now() - 86400000 * 30).toISOString(),
    checkOut: new Date(Date.now() - 86400000 * 27).toISOString(),
    guests: 2,
    totalPrice: 320,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    _id: '3',
    hotel: { _id: 'h3', name: 'City Center Hotel', location: { city: 'New York', country: 'USA' }, images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400'] },
    room: { name: 'Suite' },
    checkIn: new Date(Date.now() + 86400000 * 45).toISOString(),
    checkOut: new Date(Date.now() + 86400000 * 48).toISOString(),
    guests: 3,
    totalPrice: 780,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [cancelModalId, setCancelModalId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setBookings(placeholderBookings);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/cancel`);
      setBookings(prev => prev.map(b => 
        b._id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
      setCancelModalId(null);
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    }
  };

  const filteredBookings = bookings.length > 0 
    ? bookings.filter(b => filter === 'all' || b.status === filter)
    : placeholderBookings.filter(b => filter === 'all' || b.status === filter);

  const upcomingCount = (bookings.length > 0 ? bookings : placeholderBookings).filter(b => 
    ['pending', 'confirmed'].includes(b.status) && new Date(b.checkIn) > new Date()
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
          <p className="text-slate-500">{upcomingCount} upcoming reservation{upcomingCount !== 1 ? 's' : ''}</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex bg-slate-100 rounded-lg p-1">
          {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                filter === status
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No bookings found</h3>
          <p className="text-slate-500 mb-4">
            {filter === 'all' 
              ? "You haven't made any bookings yet."
              : `You don't have any ${filter} bookings.`}
          </p>
          <Link
            to="/"
            className="inline-flex px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            Browse Hotels
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Hotel Image */}
                <div className="md:w-48 h-48 md:h-auto">
                  <img
                    src={booking.hotel?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                    alt={booking.hotel?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link 
                        to={`/hotel/${booking.hotel?._id}`}
                        className="text-lg font-semibold text-slate-900 hover:text-teal-600 transition-colors"
                      >
                        {booking.hotel?.name}
                      </Link>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {booking.hotel?.location?.city}, {booking.hotel?.location?.country}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>

                  <p className="text-slate-600 mb-3">{booking.room?.name}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>Booked {new Date(booking.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div>
                      <span className="text-sm text-slate-500">Total</span>
                      <p className="text-xl font-bold text-slate-900">${booking.totalPrice}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/hotel/${booking.hotel?._id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                      >
                        <Eye className="h-4 w-4" />
                        View Hotel
                      </Link>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm">
                        <Download className="h-4 w-4" />
                        Receipt
                      </button>
                      {['pending', 'confirmed'].includes(booking.status) && new Date(booking.checkIn) > new Date() && (
                        <button
                          onClick={() => setCancelModalId(booking._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Cancel Booking</h3>
            </div>
            <p className="text-slate-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCancelModalId(null)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={() => handleCancel(cancelModalId)}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
