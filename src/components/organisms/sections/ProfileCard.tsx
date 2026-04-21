import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import GlassPanel from '@/components/atoms/GlassPanel';
import SpatialTypography from '@/components/atoms/SpatialTypography';

interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  companyImageUrl?: string | StaticImageData;
  linkedinUrl: string;
  fullBio: string;
}

export default function ProfileCard({
  name,
  title,
  imageUrl,
  linkedinUrl,
  fullBio
}: ProfileCardProps) {
  return (
    <GlassPanel intensity="heavy" className="h-[450px] w-full group overflow-hidden cursor-pointer">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover opacity-50 grayscale group-hover:opacity-80 transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-4">
        <SpatialTypography variant="accent" className="text-white/60 mb-2">{title}</SpatialTypography>
        <SpatialTypography as="h3" variant="h2" className="text-white font-bold mb-4">{name}</SpatialTypography>
        <p className="text-white/40 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
          {fullBio}
        </p>
        <a 
          href={linkedinUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 text-xs tracking-widest uppercase border-b border-white/20 pb-1 w-max"
        >
          CONNECT ON LINKEDIN
        </a>
      </div>
    </GlassPanel>
  );
}