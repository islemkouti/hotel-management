import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, MoreVertical, MapPin, Star } from 'lucide-react';
import api from '../../services/api';

const placeholderHotels = [
  { _id: '1', name: 'Grand Ocean Resort', location: { city: 'Miami', country: 'USA' }, rating: 4.8, roomCount: 120, status: 'active', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200'] },
  { _id: '2', name: 'Mountain View Lodge', location: { city: 'Denver', country: 'USA' }, rating: 4.6, roomCount: 45, status: 'active', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200'] },
  { _id: '3', name: 'City Center Hotel', location: { city: 'New York', country: 'USA' }, rating: 4.5, roomCount: 200, status: 'active', images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200'] },
  { _id: '4', name: 'Beachfront Paradise', location: { city: 'San Diego', country: 'USA' }, rating: 4.7, roomCount: 80, status: 'inactive', images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200'] },
];

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/hotels');
      setHotels(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch hotels:', err);
      setHotels(placeholderHotels);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (hotelId) => {
    try {
      await api.delete(`/admin/hotels/${hotelId}`);
      setHotels(prev => prev.filter(h => h._id !== hotelId));
      setDeleteModalId(null);
    } catch (err) {
      console.error('Failed to delete hotel:', err);
    }
  };

  const displayHotels = (hotels.length > 0 ? hotels : placeholderHotels).filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location?.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold text-slate-900">Hotels</h1>
        <button
          onClick={() => { setEditingHotel(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Hotel
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      {/* Hotels Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Hotel</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Location</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Rating</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Rooms</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Status</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {displayHotels.map((hotel) => (
                <tr key={hotel._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100'}
                        alt={hotel.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium text-slate-900">{hotel.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin className="h-4 w-4" />
                      {hotel.location?.city}, {hotel.location?.country}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="font-medium">{hotel.rating?.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{hotel.roomCount || 0}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hotel.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => { setEditingHotel(hotel); setShowModal(true); }}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteModalId(hotel._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <HotelModal
          hotel={editingHotel}
          onClose={() => setShowModal(false)}
          onSave={fetchHotels}
        />
      )}

      {/* Delete Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Hotel</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to delete this hotel? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HotelModal({ hotel, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: hotel?.name || '',
    description: hotel?.description || '',
    city: hotel?.location?.city || '',
    country: hotel?.location?.country || '',
    address: hotel?.location?.address || '',
    starRating: hotel?.starRating || 4,
    status: hotel?.status || 'active',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        location: {
          city: formData.city,
          country: formData.country,
          address: formData.address,
        },
        starRating: formData.starRating,
        status: formData.status,
      };

      if (hotel) {
        await api.put(`/admin/hotels/${hotel._id}`, payload);
      } else {
        await api.post('/admin/hotels', payload);
      }
      onSave();
      onClose();
    } catch (err) {
      console.error('Failed to save hotel:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-900">{hotel ? 'Edit Hotel' : 'Add New Hotel'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Hotel Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Star Rating</label>
              <select
                value={formData.starRating}
                onChange={(e) => setFormData(prev => ({ ...prev, starRating: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : hotel ? 'Update Hotel' : 'Create Hotel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
