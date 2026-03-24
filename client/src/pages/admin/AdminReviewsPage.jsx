import { useState, useEffect } from 'react';
import { Search, Star, Trash2, Eye, Check, X, Flag } from 'lucide-react';
import api from '../../services/api';

const placeholderReviews = [
  { _id: '1', user: { firstName: 'John', lastName: 'Doe' }, hotel: { name: 'Grand Ocean Resort' }, rating: 5, title: 'Amazing stay!', comment: 'The hotel exceeded all expectations. Perfect location and excellent service.', status: 'approved', createdAt: new Date().toISOString() },
  { _id: '2', user: { firstName: 'Sarah', lastName: 'Smith' }, hotel: { name: 'Mountain View Lodge' }, rating: 4, title: 'Great experience', comment: 'Beautiful views and comfortable rooms. Would recommend!', status: 'pending', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: '3', user: { firstName: 'Mike', lastName: 'Johnson' }, hotel: { name: 'City Center Hotel' }, rating: 2, title: 'Disappointing', comment: 'Room was not as advertised. Staff was unhelpful.', status: 'flagged', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
];

const statusColors = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  flagged: 'bg-red-100 text-red-700',
  rejected: 'bg-slate-100 text-slate-600',
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/reviews');
      setReviews(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setReviews(placeholderReviews);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reviewId, newStatus) => {
    try {
      await api.put(`/admin/reviews/${reviewId}/status`, { status: newStatus });
      setReviews(prev => prev.map(r => r._id === reviewId ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error('Failed to update review status:', err);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await api.delete(`/admin/reviews/${reviewId}`);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
    } catch (err) {
      console.error('Failed to delete review:', err);
    }
  };

  const displayReviews = (reviews.length > 0 ? reviews : placeholderReviews)
    .filter(r => {
      const matchesSearch = r.user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.user?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.hotel?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.comment?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
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
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Reviews</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search reviews..."
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
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="flagged">Flagged</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayReviews.map((review) => (
          <div key={review._id} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-medium text-slate-900">
                  {review.user?.firstName} {review.user?.lastName}
                </p>
                <p className="text-sm text-slate-500">{review.hotel?.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[review.status]}`}>
                  {review.status}
                </span>
              </div>
            </div>

            {review.title && (
              <h3 className="font-medium text-slate-900 mb-2">{review.title}</h3>
            )}
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{review.comment}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-sm text-slate-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReview(review)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <Eye className="h-4 w-4" />
                </button>
                {review.status === 'pending' && (
                  <button
                    onClick={() => handleStatusUpdate(review._id, 'approved')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    title="Approve"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
                {review.status !== 'flagged' && (
                  <button
                    onClick={() => handleStatusUpdate(review._id, 'flagged')}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"
                    title="Flag"
                  >
                    <Flag className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(review._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Details Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Review Details</h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">
                    {selectedReview.user?.firstName} {selectedReview.user?.lastName}
                  </p>
                  <p className="text-sm text-slate-500">{selectedReview.hotel?.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= selectedReview.rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {selectedReview.title && (
                <div>
                  <p className="text-sm text-slate-500">Title</p>
                  <p className="font-medium">{selectedReview.title}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-500">Review</p>
                <p className="text-slate-700">{selectedReview.comment}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-sm text-slate-500">
                  Submitted: {new Date(selectedReview.createdAt).toLocaleString()}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusColors[selectedReview.status]}`}>
                  {selectedReview.status}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
              {selectedReview.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedReview._id, 'rejected');
                      setSelectedReview(null);
                    }}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleStatusUpdate(selectedReview._id, 'approved');
                      setSelectedReview(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                </>
              )}
              {selectedReview.status !== 'pending' && (
                <button
                  onClick={() => setSelectedReview(null)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
