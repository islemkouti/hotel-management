import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Edit2, Trash2, MessageCircle } from 'lucide-react';
import api from '../../services/api';

const placeholderReviews = [
  {
    _id: '1',
    hotel: { _id: 'h1', name: 'Grand Ocean Resort', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200'] },
    rating: 5,
    title: 'Amazing beach vacation!',
    comment: 'Perfect location right on the beach. The staff was incredibly helpful and the room was spotless. Would definitely recommend!',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    helpful: 8,
  },
  {
    _id: '2',
    hotel: { _id: 'h2', name: 'Mountain View Lodge', images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200'] },
    rating: 4,
    title: 'Great mountain getaway',
    comment: 'Beautiful views and cozy atmosphere. The breakfast was excellent. Only minor issue was the parking situation.',
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
    helpful: 5,
  },
];

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/reviews/my-reviews');
      setReviews(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setReviews(placeholderReviews);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
      setDeleteModalId(null);
    } catch (err) {
      console.error('Failed to delete review:', err);
    }
  };

  const handleUpdate = async (reviewId, data) => {
    try {
      await api.put(`/reviews/${reviewId}`, data);
      setReviews(prev => prev.map(r => r._id === reviewId ? { ...r, ...data } : r));
      setEditingReview(null);
    } catch (err) {
      console.error('Failed to update review:', err);
    }
  };

  const displayReviews = reviews.length > 0 ? reviews : placeholderReviews;

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
        <h1 className="text-2xl font-bold text-slate-900">My Reviews</h1>
        <p className="text-slate-500">{displayReviews.length} review{displayReviews.length !== 1 ? 's' : ''}</p>
      </div>

      {displayReviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <MessageCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No reviews yet</h3>
          <p className="text-slate-500 mb-4">Share your experience after your next stay!</p>
          <Link
            to="/dashboard/bookings"
            className="inline-flex px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            View Bookings
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {displayReviews.map((review) => (
            <div key={review._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              {editingReview === review._id ? (
                <EditReviewForm
                  review={review}
                  onSave={(data) => handleUpdate(review._id, data)}
                  onCancel={() => setEditingReview(null)}
                />
              ) : (
                <div className="flex flex-col md:flex-row">
                  {/* Hotel Image */}
                  <Link to={`/hotel/${review.hotel?._id}`} className="md:w-40 h-32 md:h-auto">
                    <img
                      src={review.hotel?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200'}
                      alt={review.hotel?.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Review Details */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link 
                          to={`/hotel/${review.hotel?._id}`}
                          className="font-semibold text-slate-900 hover:text-teal-600 transition-colors"
                        >
                          {review.hotel?.name}
                        </Link>
                        <p className="text-sm text-slate-500">
                          Reviewed on {new Date(review.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {review.title && (
                      <h3 className="font-medium text-slate-900 mb-2">{review.title}</h3>
                    )}
                    <p className="text-slate-600 mb-4">{review.comment}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                      <span className="text-sm text-slate-500">
                        {review.helpful || 0} people found this helpful
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingReview(review._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteModalId(review._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Review</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
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

function EditReviewForm({ review, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    rating: review.rating,
    title: review.title,
    comment: review.comment,
  });

  return (
    <div className="p-5">
      <h3 className="font-semibold text-slate-900 mb-4">Edit Review for {review.hotel?.name}</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            >
              <Star
                className={`h-8 w-8 ${
                  star <= formData.rating
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-slate-300 hover:text-amber-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Review</label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
