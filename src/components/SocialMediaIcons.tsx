import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

const socials = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

const SocialMediaIcons = ({ position = 'top-right' }) => {
  const positionClass = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }[position];

  return (
    <div className={`fixed z-50 ${positionClass} flex gap-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md`}>
      {socials.map(({ name, icon: Icon, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="text-[#54606E] hover:text-[#8DC63F] transition-colors"
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
