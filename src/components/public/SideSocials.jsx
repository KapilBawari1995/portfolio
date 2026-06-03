import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function SideSocials({ profileData }) {
  return (
    <div className="hidden lg:flex flex-col items-center gap-4 fixed left-5 top-0 z-50">
      <div className="w-[1px] h-40 bg-gray-500"></div>
      
      {profileData?.github_url && (
        <a href={profileData.github_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#c778dd] transition-colors text-lg">
          <FaGithub />
        </a>
      )}
      
      {profileData?.linkedin_url && (
        <a href={profileData.linkedin_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#c778dd] transition-colors text-lg">
          <FaLinkedin />
        </a>
      )}
      
      {profileData?.instagram_url && (
        <a href={profileData.instagram_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#c778dd] transition-colors text-lg">
          <FaInstagram />
        </a>
      )}

      {profileData?.facebook_url && (
        <a href={profileData.facebook_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#c778dd] transition-colors text-lg">
          <FaFacebook />
        </a>
      )}
    </div>
  );
}