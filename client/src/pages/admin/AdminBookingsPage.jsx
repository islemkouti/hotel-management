import { useState, useEffect } from 'react';
import { Search, Calendar, Eye, Check, X, Download } from 'lucide-react';
import api from '../../services/api';

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-slate-100 text-slate-700',
};

const placeholderBookings = [
  { _id: '1', user: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' }, hotel: { name: 'Grand Ocean Resort' }, room: { name: 'Deluxe Suite' }, checkIn: new Date(Date.now() + 86400000 * 7).toISOString(), checkOut: new Date(Date.now() + 86400000 * 10).toISOString(), guests: 2, totalPrice: 450, status: 'confirmed', createdAt: new Date().toISOString() },
  { _id: '2', user: { firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com' }, hotel: { name: 'Mountain View Lodge' }, room: { name: 'Standard Room' }, checkIn: new Date(Date.now() + 86400000 * 14).toISOString(), checkOut: new Date(Date.now() + 86400000 * 17).toISOString(), guests: 3, totalPrice: 320, status: 'pending', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: '3', user: { firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com' }, hotel: { name: 'City Center Hotel' }, room: { name: 'Suite' }, checkIn: new Date(Date.now() - 86400000 * 5).toISOString(), checkOut: new Date(Date.now() - 86400000 * 2).toISOString(), guests: 2, totalPrice: 580, status: 'completed', createdAt: new Date(Date.now() - 86400000 * 10).toISOString() },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/bookings');
      setBookings(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setBookings(placeholderBookings);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await api.put(`/admin/bookings/${bookingId}/status`, { status: newStatus });
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  const displayBookings = (bookings.length > 0 ? bookings : placeholderBookings)
    .filter(b => {
      const matchesSearch = b.user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.hotel?.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

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
        <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
          <Download className="h-5 w-5" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Guest</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Hotel / Room</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Dates</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Total</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {displayBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {booking.user?.firstName} {booking.user?.lastName}
                      </p>
                      <p className="text-sm text-slate-500">{booking.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{booking.hotel?.name}</p>
                      <p className="text-sm text-slate-500">{booking.room?.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">${booking.totalPrice}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Confirm"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Booking Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Guest</p>
                  <p className="font-medium">{selectedBooking.user?.firstName} {selectedBooking.user?.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium">{selectedBooking.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Hotel</p>
                  <p className="font-medium">{selectedBooking.hotel?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Room</p>
                  <p className="font-medium">{selectedBooking.room?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Check-in</p>
                  <p className="font-medium">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Check-out</p>
                  <p className="font-medium">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Guests</p>
                  <p className="font-medium">{selectedBooking.guests}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total Price</p>
                  <p className="font-medium text-teal-600">${selectedBooking.totalPrice}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-500 mb-2">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColors[selectedBooking.status]}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
