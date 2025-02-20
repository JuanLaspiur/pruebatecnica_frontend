'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners'; 

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
      router.push('/login');
  }, [router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Image 
        src="/backgraund.jpg" 
        alt="Background" 
        layout="fill" 
        objectFit="cover" 
        quality={90} 
        priority
      />
      
        <div className="absolute flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <ClipLoader color="#ffffff" size={50} loading={true} />
        </div>
    </div>
  );
};

export default HomePage;

