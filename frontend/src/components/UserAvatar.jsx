import React, { useState } from 'react';
import { Avatar } from 'flowbite-react';
import { HiUser } from 'react-icons/hi';

const UserAvatar = ({ 
  src, 
  alt = 'user', 
  size = 'md', 
  rounded = true, 
  className = '',
  showFallbackIcon = true 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  // If image failed to load and we want to show fallback icon
  if ((imageError || !src) && showFallbackIcon) {
    return (
      <div className={`flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full ${className}`}>
        <HiUser className="text-gray-500 dark:text-gray-400" size={size === 'sm' ? 16 : size === 'lg' ? 32 : 24} />
      </div>
    );
  }

  return (
    <Avatar
      img={imageError ? defaultImage : (src || defaultImage)}
      alt={alt}
      size={size}
      rounded={rounded}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
    />
  );
};

export default UserAvatar;