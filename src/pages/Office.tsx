import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTgAutoExpand } from '../hooks/useTgAutoExpand';
import NavBar from '../components/NavBar'

interface TableRow {
  id: number; // Пример ключа (измените в зависимости от структуры вашей таблицы)
  name: string;
  description: string;
}

const Office: React.FC = () => {
  const location = useLocation(); // Получаем текущий путь
  useTgAutoExpand(); // Автоматическое применение темы

  // Хук состояния для хранения данных
  const [rows, setRows] = useState<TableRow[]>([]);

  // Хук состояния для отслеживания загрузки
  const [isLoading, setIsLoading] = useState(true);

  // Хук состояния для обработки ошибок
  const [error, setError] = useState<string | null>(null);

  // GET-запрос к API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/items');
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        setRows(data); // Сохраняем данные в состояние
      } catch (err: any) {
        setError(err.message); // Обрабатываем ошибки
      } finally {
        setIsLoading(false); // Завершаем процесс загрузки
      }
    };

    fetchData();
  }, []);

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
            Welcome
          </h1>
          <p
            className="text-sm sm:text-base mb-6 sm:mb-8 text-center"
            style={{ color: textColor }}
          >
            This is a simple profile page for your application.
          </p>

          {/* Отображение данных */}
          {isLoading ? (
            <p className="text-center" style={{ color: textColor }}>Загрузка...</p>
          ) : error ? (
            <p className="text-center text-red-500">Ошибка: {error}</p>
          ) : (
            <ul className="list-disc pl-5">
              {rows.map((row) => (
                <li key={row.id} style={{ color: textColor }}>
                  <strong>{row.name}</strong>: {row.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Навигационная панель */}
      <NavBar location={location} textColor={textColor} accentTextColor={accentTextColor} />
    </div>
  );
};

export default Office;
