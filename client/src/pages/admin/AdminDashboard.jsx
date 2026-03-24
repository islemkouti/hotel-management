import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Calendar, DollarSign, TrendingUp, TrendingDown, Star, MessageSquare, ArrowRight } from 'lucide-react';
import api from '../../services/api';

const placeholderStats = {
  totalHotels: 24,
  totalUsers: 1234,
  totalBookings: 856,
  totalRevenue: 125430,
  monthlyChange: {
    hotels: 12,
    users: 8.5,
    bookings: -3.2,
    revenue: 15.7,
  },
};

const placeholderRecentBookings = [
  { _id: '1', user: { firstName: 'John', lastName: 'Doe' }, hotel: { name: 'Grand Ocean Resort' }, totalPrice: 450, status: 'confirmed', createdAt: new Date().toISOString() },
  { _id: '2', user: { firstName: 'Sarah', lastName: 'Smith' }, hotel: { name: 'Mountain View Lodge' }, totalPrice: 320, status: 'pending', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { _id: '3', user: { firstName: 'Mike', lastName: 'Johnson' }, hotel: { name: 'City Center Hotel' }, totalPrice: 580, status: 'confirmed', createdAt: new Date(Date.now() - 7200000).toISOString() },
];

const placeholderRecentReviews = [
  { _id: '1', user: { firstName: 'Emma', lastName: 'Wilson' }, hotel: { name: 'Grand Ocean Resort' }, rating: 5, comment: 'Amazing experience!', createdAt: new Date().toISOString() },
  { _id: '2', user: { firstName: 'Alex', lastName: 'Brown' }, hotel: { name: 'Mountain View Lodge' }, rating: 4, comment: 'Great location and service.', createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, bookingsRes, reviewsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/bookings/recent'),
        api.get('/admin/reviews/recent'),
      ]);
      setStats(statsRes.data.data);
      setRecentBookings(bookingsRes.data.data || []);
      setRecentReviews(reviewsRes.data.data || []);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setStats(placeholderStats);
      setRecentBookings(placeholderRecentBookings);
      setRecentReviews(placeholderRecentReviews);
    } finally {
      setLoading(false);
    }
  };

  const displayStats = stats || placeholderStats;
  const displayBookings = recentBookings.length > 0 ? recentBookings : placeholderRecentBookings;
  const displayReviews = recentReviews.length > 0 ? recentReviews : placeholderRecentReviews;

  const statCards = [
    { label: 'Total Hotels', value: displayStats.totalHotels, icon: Building2, change: displayStats.monthlyChange?.hotels, color: 'teal' },
    { label: 'Total Users', value: displayStats.totalUsers?.toLocaleString(), icon: Users, change: displayStats.monthlyChange?.users, color: 'blue' },
    { label: 'Total Bookings', value: displayStats.totalBookings?.toLocaleString(), icon: Calendar, change: displayStats.monthlyChange?.bookings, color: 'amber' },
    { label: 'Total Revenue', value: `$${displayStats.totalRevenue?.toLocaleString()}`, icon: DollarSign, change: displayStats.monthlyChange?.revenue, color: 'green' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map(({ label, value, icon: Icon, change, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${color}-100`}>
                <Icon className={`h-6 w-6 text-${color}-600`} />
              </div>
              {change !== undefined && (
                <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{Math.abs(change)}%</span>
                </div>
              )}
            </div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
            <Link to="/admin/bookings" className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {displayBookings.map((booking) => (
              <div key={booking._id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">
                    {booking.user?.firstName} {booking.user?.lastName}
                  </p>
                  <p className="text-sm text-slate-500">{booking.hotel?.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900">${booking.totalPrice}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Reviews</h2>
            <Link to="/admin/reviews" className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {displayReviews.map((review) => (
              <div key={review._id} className="py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900">
                    {review.user?.firstName} {review.user?.lastName}
                  </p>
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
                </div>
                <p className="text-sm text-slate-500 mb-1">{review.hotel?.name}</p>
                <p className="text-sm text-slate-600 line-clamp-1">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
