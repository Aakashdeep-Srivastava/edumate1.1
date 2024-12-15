'use client';
// src/components/BackgroundVideo.jsx
import { useEffect, useRef } from 'react';

const BackgroundVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays automatically and handles any autoplay restrictions
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {/* Dark overlay for better content readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* Video element with blur effect */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover scale-105 blur-sm"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/images/Landing.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;