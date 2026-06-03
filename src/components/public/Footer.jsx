import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer({ profileData }) {
  return (
    <footer className="border-t border-gray-700 mt-32 bg-[#282c33] font-mono text-white">
      <div className="max-w-6xl mx-auto py-8 px-8 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          {/* Left side */}
          <div className="space-y-4">
            <div className="font-bold text-base flex items-center gap-2">
              <span className="text-[#c778dd]">❖</span> {profileData?.copyright_name || "Kapil Bawari"}
            </div>
            <p className="text-gray-300 text-sm">{profileData?.email || "hello@kapil.dev"}</p>
          </div>

          {/* Right side (Socials) */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-white sm:text-right">Media</h3>
            <div className="flex items-center gap-4 text-xl sm:justify-end">
              {profileData?.github_url && (
                <a href={profileData.github_url} target="_blank" rel="noreferrer" className="hover:text-[#c778dd] transition-colors">
                  <FaGithub />
                </a>
              )}
              {profileData?.linkedin_url && (
                <a href={profileData.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-[#c778dd] transition-colors">
                  <FaLinkedin />
                </a>
              )}
              {profileData?.instagram_url && (
                <a href={profileData.instagram_url} target="_blank" rel="noreferrer" className="hover:text-[#c778dd] transition-colors">
                  <FaInstagram />
                </a>
              )}
              {profileData?.facebook_url && (
                <a href={profileData.facebook_url} target="_blank" rel="noreferrer" className="hover:text-[#c778dd] transition-colors">
                  <FaFacebook />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-700">
          © Copyright {new Date().getFullYear()}. Made by {profileData?.copyright_name || "Kapil Bawari"}
        </div>
      </div>
    </footer>
  );
}