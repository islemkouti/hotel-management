import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageGallery({ images, currentIndex, onClose, onIndexChange }) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  const handlePrev = () => {
    const newIndex = index === 0 ? images.length - 1 : index - 1;
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const handleNext = () => {
    const newIndex = index === images.length - 1 ? 0 : index + 1;
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <span className="text-white font-medium">
          {index + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main Image */}
      <div className="flex items-center justify-center h-full px-16">
        <img
          src={images[index]}
          alt={`Image ${index + 1}`}
          className="max-h-[85vh] max-w-full object-contain"
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex justify-center gap-2 overflow-x-auto max-w-4xl mx-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); onIndexChange?.(i); }}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                i === index ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
