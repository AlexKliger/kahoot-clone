import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import GameProvider from './context/GameContext'
import ReactDOM from 'react-dom/client'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GameProvider>
      <App />
    </GameProvider>
  </BrowserRouter>
);
