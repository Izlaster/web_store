import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTgAutoExpand } from '../hooks/useTgAutoExpand';
import { UserProps } from "../interfaces/user";
import NavBar from '../components/NavBar';

const Home: React.FC<UserProps> = (props) => {  // Указываем тип UserProps для props
  const location = useLocation(); // Получаем текущий путь
  useTgAutoExpand(); // Автоматическое применение темы

  // Получаем цвета темы Telegram через CSS переменные
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-text-color').trim();
  const accentTextColor = getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-button-color').trim();

  return (
    <div className="min-h-screen bg-bg_color flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-section_bg_color p-4 sm:p-8 rounded-lg shadow-2xl max-w-md w-full">
          <h1
            className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center"
            style={{ color: accentTextColor }}
          >
            Welcome, {props.data.username}!
          </h1>
          <p
            className="text-sm sm:text-base mb-6 sm:mb-8 text-center"
            style={{ color: textColor }}
          >
            This is a simple home page for your application.
          </p>
        </div>
      </div>

      {/* Навигационная панель */}
      <NavBar location={location} textColor={textColor} accentTextColor={accentTextColor} />
    </div>
  );
};

export default Home;
