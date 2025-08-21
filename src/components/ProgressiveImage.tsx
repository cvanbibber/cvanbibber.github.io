import React, { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  hoverBlur?: boolean;
};

// Simple progressive image with a static skeleton placeholder and fade-in
const ProgressiveImage: React.FC<Props> = ({ src, alt, className, hoverBlur = false }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full ${className || ''}`}>
      {/* Skeleton */}
      <div
        className={`absolute inset-0 bg-gray-200 ${loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        aria-hidden="true"
      />

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${hoverBlur ? 'transition filter duration-300 ease-out group-hover:blur-sm group-hover:brightness-95' : ''}`}
      />
    </div>
  );
};

export default ProgressiveImage;
