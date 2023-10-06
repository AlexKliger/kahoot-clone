// Package imports
import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { socket } from './networking/socket'
import { createGame, joinGame, leaveGame } from './networking/api'
// Component imports
import CreateGamePage from './components/create-game-page/CreateGamePage'
import GamePage from './components/game-page/GamePage'
import Header from './components/core/Header'
import LandingPage from './components/landing-page/LandingPage'
// CSS import
import './css/app.css';
import './css/modules.css'
import './css/themes.css'

!localStorage.getItem('playerId') && localStorage.setItem('playerId', uid(4))

function App() {
  const [playerId] = useState(localStorage.getItem('playerId'))

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <LandingPage />
          }
        ></Route>

        <Route path="game">
          <Route
            path="play"
            element={ <GamePage
                        playerId={ playerId } ///////////
                      /> }
          ></Route>

          <Route
            path="create"
            element={ <CreateGamePage /> }
          ></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
