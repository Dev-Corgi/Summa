import Link from 'next/link';
import { Droplet, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = [
  { text: 'Sitemap', href: '/sitemap' },
  { text: 'Privacy Policy', href: '/privacy' },
  { text: 'Cancel Subscription', href: '/cancel' },
  { text: 'Do Not Sell My Personal Information', href: '/do-not-sell' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com' },
  { icon: Twitter, href: 'https://twitter.com' },
  { icon: Linkedin, href: 'https://linkedin.com' },
  { icon: Instagram, href: 'https://instagram.com' },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center mb-4">
            <Droplet className="w-6 h-6 mr-2 text-green-500" />
            <span className="font-bold text-xl">Blinkist</span>
          </div>
          <div className="flex space-x-4 mb-6">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          <div className="text-xs text-gray-500 space-y-2">
            <p>&copy; Blinkist 2025</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {footerLinks.map((link) => (
                    <Link key={link.text} href={link.href} className="hover:underline">{link.text}</Link>
                ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Droplet className="w-5 h-5 mr-2 text-green-500" />
            <span className="font-bold mr-4 text-base text-gray-800 dark:text-gray-200">Blinkist</span>
            <span className="mr-4">&copy; Blinkist 2025</span>
            {footerLinks.map((link) => (
              <Link key={link.text} href={link.href} className="mr-4 hover:underline">{link.text}</Link>
            ))}
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
