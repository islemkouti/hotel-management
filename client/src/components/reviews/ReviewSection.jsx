import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import api from '../../services/api';

export default function ReviewSection({ reviews, hotelId, onReviewAdded }) {
  const { isAuthenticated, user } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => Math.round(r.rating) === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => Math.round(r.rating) === rating).length / reviews.length) * 100
      : 0,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post(`/reviews/hotel/${hotelId}`, formData);
      setFormData({ rating: 5, title: '', comment: '' });
      setShowForm(false);
      onReviewAdded?.();
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setLoading(false);
    }
  };

  const placeholderReviews = [
    {
      _id: '1',
      user: { firstName: 'Sarah', lastName: 'Johnson', avatar: null },
      rating: 5,
      title: 'Amazing stay!',
      comment: 'The hotel exceeded all our expectations. The staff was incredibly friendly and the room was spotless. Would definitely come back!',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      helpful: 12,
    },
    {
      _id: '2',
      user: { firstName: 'Michael', lastName: 'Chen', avatar: null },
      rating: 4,
      title: 'Great location, good value',
      comment: 'Perfect location for exploring the city. The breakfast buffet was excellent. Only minor issue was the wifi being a bit slow.',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      helpful: 8,
    },
    {
      _id: '3',
      user: { firstName: 'Emma', lastName: 'Williams', avatar: null },
      rating: 5,
      title: 'Perfect for business travel',
      comment: 'Clean, quiet, and professional. The business center was well-equipped and the staff helped arrange my airport transfer seamlessly.',
      createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
      helpful: 5,
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : placeholderReviews;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Guest Reviews</h2>
        {isAuthenticated && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
          >
            Write a review
          </button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left md:pr-8 md:border-r border-slate-200">
            <div className="text-5xl font-bold text-slate-900 mb-2">{averageRating}</div>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(parseFloat(averageRating))
                      ? 'text-amber-500 fill-amber-500'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-slate-500">{displayReviews.length} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="w-8 text-sm text-slate-600">{rating}</span>
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${percentage || (rating === 5 ? 60 : rating === 4 ? 25 : 10)}%` }}
                  />
                </div>
                <span className="w-8 text-sm text-slate-500">{count || (rating === 5 ? 2 : 1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-4">Share your experience</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Your rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
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
              placeholder="Summarize your experience"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Your review</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Tell us about your stay..."
              rows={4}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {displayReviews.map((review) => (
          <div key={review._id} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-teal-700 font-semibold">
                    {review.user?.firstName?.[0] || 'U'}{review.user?.lastName?.[0] || ''}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {review.user?.firstName} {review.user?.lastName?.[0]}.
                  </p>
                  <p className="text-sm text-slate-500">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
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
              <h4 className="font-semibold text-slate-900 mb-2">{review.title}</h4>
            )}
            <p className="text-slate-600 mb-4">{review.comment}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-teal-600 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful ({review.helpful || 0})</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-500 hover:text-teal-600 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
