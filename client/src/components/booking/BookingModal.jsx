import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Users, CreditCard, Check, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function BookingModal({ hotel, room, checkIn: initialCheckIn, checkOut: initialCheckOut, guests: initialGuests, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    checkIn: initialCheckIn || new Date().toISOString().split('T')[0],
    checkOut: initialCheckOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: initialGuests || 2,
    specialRequests: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const nights = Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)) || 1;
  const subtotal = room.price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee + taxes;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await api.post('/bookings', {
        hotel: hotel._id,
        room: room._id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        specialRequests: formData.specialRequests,
        totalPrice: total,
        paymentMethod: formData.paymentMethod,
      });
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        navigate('/dashboard/bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-4">
            Your reservation at {hotel.name} has been confirmed. Check your email for details.
          </p>
          <p className="text-sm text-slate-500">Redirecting to your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Complete your booking</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                  step >= s ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 ${step > s ? 'bg-teal-600' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Booking Summary Card */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <div className="flex gap-4">
              <img
                src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200'}
                alt={room.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-slate-900">{hotel.name}</h3>
                <p className="text-sm text-slate-600">{room.name}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                  <span>{formData.checkIn} - {formData.checkOut}</span>
                  <span>{formData.guests} guests</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Step 1: Dates & Guests */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Confirm your stay details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Number of guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Special requests (optional)</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special requests or requirements..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Payment details</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  {['credit_card', 'paypal'].map((method) => (
                    <label
                      key={method}
                      className={`flex-1 p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.paymentMethod === method
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-slate-600" />
                        <span className="font-medium capitalize">{method.replace('_', ' ')}</span>
                      </div>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === 'credit_card' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Card number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Expiry date</label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Review your booking</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-600">${room.price} x {nights} night{nights > 1 ? 's' : ''}</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-600">Service fee</span>
                  <span className="font-medium">${serviceFee}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-slate-200">
                  <span className="text-slate-600">Taxes</span>
                  <span className="font-medium">${taxes}</span>
                </div>
                <div className="flex justify-between py-3 text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-teal-600">${total}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Free cancellation</strong> until 24 hours before check-in. After that, cancel before check-in and get a 50% refund.
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Confirm & Pay ${total}</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
