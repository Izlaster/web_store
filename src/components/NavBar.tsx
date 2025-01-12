import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
  location: { pathname: string };
  textColor: string;
  accentTextColor: string;
}

const NavBar: React.FC<NavBarProps> = ({ location, textColor, accentTextColor }) => (
  <nav className="bg-section_bg_color p-2 sm:p-4 shadow-inner">
    <ul className="flex justify-around text-xs sm:text-base">
      {[
        { to: '/', text: 'Основной экран' },
        { to: '/proxy', text: 'Прокси' },
        { to: '/faq', text: 'FAQ' },
        { to: '/partners', text: 'Партнеры' },
        { to: '/profile', text: 'Личный кабинет' },
      ].map((link) => (
        <li key={link.to} className="flex-1">
          <Link
            to={link.to}
            className="block text-center py-1 sm:py-2 px-2 sm:px-4 transition duration-300"
            style={{
              color: location.pathname === link.to ? accentTextColor : textColor,
              fontWeight: location.pathname === link.to ? 'bold' : 'normal',
            }}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavBar;
