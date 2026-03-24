import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">StayBook</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Find and book your perfect stay. Explore hotels worldwide with the best prices guaranteed.
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Safety Information</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Cancellation Options</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Travel Guides</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Hotel Partners</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Careers</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Accessibility</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} StayBook. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <select className="text-sm text-gray-600 bg-transparent border-none focus:outline-none cursor-pointer">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
            </select>
            <select className="text-sm text-gray-600 bg-transparent border-none focus:outline-none cursor-pointer">
              <option>$ USD</option>
              <option>€ EUR</option>
              <option>£ GBP</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
