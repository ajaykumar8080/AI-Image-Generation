
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';

const IMAGES = [
  'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1920&h=1080&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=1920&h=1080&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1920&h=1080&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=1920&h=1080&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=1920&h=1080&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=1920&h=1080&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=1920&h=1080&auto-format&fit=crop',
  'https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=1920&h=1080&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=1920&h=1080&auto-format&fit=crop',
  'https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=1920&h=1080&auto-format&fit=crop'
];

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
};

const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl bg-card">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute w-full h-full"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.8, ease: 'easeInOut' },
          }}
        >
          <NextImage
            src={IMAGES[currentIndex]}
            alt={`Slideshow image ${currentIndex + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ImageSlideshow;
