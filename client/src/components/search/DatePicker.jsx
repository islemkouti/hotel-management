import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday, 
  isBefore, 
  addMonths, 
  subMonths,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function DatePicker({ selectedDate, onSelect, onClose, minDate = new Date(), mode }) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isDisabled = (date) => {
    return isBefore(date, minDate) && !isSameDay(date, minDate);
  };

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute top-full left-0 right-0 lg:left-auto lg:right-auto lg:w-[340px] mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-20">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-gray-500">
            Select {mode === 'checkIn' ? 'check-in' : 'check-out'} date
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-semibold text-gray-900">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const disabled = isDisabled(day);
            const selected = selectedDate && isSameDay(day, selectedDate);
            const today = isToday(day);
            const inMonth = isSameMonth(day, currentMonth);

            return (
              <button
                key={day.toISOString()}
                onClick={() => !disabled && onSelect(day)}
                disabled={disabled}
                className={`
                  aspect-square flex items-center justify-center rounded-full text-sm
                  transition-colors
                  ${!inMonth ? 'text-gray-300' : ''}
                  ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                  ${selected ? 'bg-brand text-white hover:bg-brand' : ''}
                  ${today && !selected ? 'border border-brand text-brand' : ''}
                `}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onSelect(new Date())}
            className="flex-1 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Today
          </button>
          <button
            onClick={() => onSelect(addMonths(new Date(), 1))}
            className="flex-1 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Next Month
          </button>
        </div>
      </div>
    </>
  );
}

export default DatePicker;
