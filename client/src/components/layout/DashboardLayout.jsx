import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { User, Calendar, Star, Heart, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../../stores/authStore';

const navItems = [
  { to: '/dashboard', icon: User, label: 'Profile', end: true },
  { to: '/dashboard/bookings', icon: Calendar, label: 'My Bookings' },
  { to: '/dashboard/reviews', icon: Star, label: 'My Reviews' },
  { to: '/dashboard/favorites', icon: Heart, label: 'Favorites' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="h-6 w-6 text-slate-600" />
        </button>
        <h1 className="font-semibold text-slate-900">Dashboard</h1>
        <div className="w-10" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200
          transform transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Mobile Close Button */}
          <div className="lg:hidden flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="h-6 w-6 text-slate-600" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-700 font-semibold text-lg">
                  {user?.firstName?.[0] || 'U'}{user?.lastName?.[0] || ''}
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  {user?.firstName || 'User'} {user?.lastName || ''}
                </p>
                <p className="text-sm text-slate-500">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-teal-50 text-teal-700 font-medium' 
                    : 'text-slate-600 hover:bg-slate-100'
                  }
                `}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </NavLink>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors mt-4"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
