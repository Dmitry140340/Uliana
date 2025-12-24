import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container">
      <div className="form-container">
        <h1>О проекте</h1>
        <p className="description">Это SPA (Single Page Application) каталог фильмов, созданный с использованием React, TypeScript и Redux Toolkit.</p>
        <p className="description">Возможности:</p>
        <ul style={{ listStyle: 'disc', paddingLeft: '2rem', lineHeight: '1.8', color: '#b3b3b3' }}>
          <li>Просмотр популярных фильмов</li>
          <li>Поиск фильмов по названию</li>
          <li>Просмотр подробной информации о фильме</li>
          <li>Добавление новых фильмов</li>
          <li>Удаление фильмов</li>
          <li>Добавление фильмов в избранное</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
