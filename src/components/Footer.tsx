import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.github,
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: personalInfo.linkedin,
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: `mailto:${personalInfo.email}`,
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conor Van Bibber</h3>
            <p className="text-gray-300 mb-4">
              {personalInfo.subtitle}
            </p>
            <div className="flex items-center space-x-2 text-gray-300 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Mail className="h-4 w-4" />
              <a 
                href={`mailto:${personalInfo.email}`}
                className="hover:text-white transition-colors duration-200"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Projects
                </a>
              </li>
              <li>
                <a href="/tools" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Engineering Tools
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    aria-label={link.name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} Conor Van Bibber. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
