import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import Chatbot from './components/chatbot/Chatbot';

// Pages
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// User Dashboard Pages
import ProfilePage from './pages/dashboard/ProfilePage';
import BookingsPage from './pages/dashboard/BookingsPage';
import UserReviewsPage from './pages/dashboard/UserReviewsPage';
import FavoritesPage from './pages/dashboard/FavoritesPage';
import SettingsPage from './pages/dashboard/SettingsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHotelsPage from './pages/admin/AdminHotelsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';

import useAuthStore from './stores/authStore';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="hotel/:id" element={<HotelDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProfilePage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="reviews" element={<UserReviewsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="hotels" element={<AdminHotelsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
        </Route>
      </Routes>

      {/* Global Chatbot */}
      <Chatbot />
    </>
  );
}

export default App;
