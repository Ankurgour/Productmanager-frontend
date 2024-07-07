import React, { useState, useEffect, useRef } from 'react';

export function Carousel({ className, children, opts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = 3;
  const timeoutRef = useRef(null);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (opts && opts.loop) {
      timeoutRef.current = setTimeout(() => {
        handleNext();
      }, 3000); // Adjust the delay as needed

      return () => {
        clearTimeout(timeoutRef.current);
      };
    }
  }, [activeIndex, opts]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, (child, index) => (
          <div className="flex-shrink-0 w-full">
            {children[index]}
          </div>
        ))}
      </div>
      <CarouselPrevious onClick={handlePrevious} className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}

export function CarouselContent({ children }) {
  return <>{children}</>;
}

export function CarouselItem({ children }) {
  return <div className="flex-shrink-0 w-full">{children}</div>;
}

export function CarouselPrevious({ onClick, className }) {
  return <button onClick={onClick} className={className}><ChevronLeftIcon className="w-6 h-6" /><span className="sr-only">Previous</span></button>;
}

export function CarouselNext({ onClick, className }) {
  return <button onClick={onClick} className={className}><ChevronRightIcon className="w-6 h-6" /><span className="sr-only">Next</span></button>;
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
