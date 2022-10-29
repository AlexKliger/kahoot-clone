// Package imports
import { useCallback, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { io } from 'socket.io-client'
import { createGame, joinGame, leaveGame } from './util/api'
// Component imports
import CreateGamePage from './components/CreateGamePage'
import GamePage from './components/GamePage'
import Header from './components/Header'
import LandingPage from './components/LandingPage'
// CSS import
import './css/app.css';
import './css/modules.css'
import './css/themes.css'

!localStorage.getItem('playerId') && localStorage.setItem('playerId', uid(4))

function App() {
  const [playerId] = useState(localStorage.getItem('playerId'))
  const [game, setGame] = useState()
  const [socket, setSocket] = useState()

  const navigate = useNavigate()

  const handleJoinGame = useCallback(async (playerName, gameId) => {
    setGame(await joinGame(playerId, playerName, gameId))

    navigate('/game/play', { replace: true })

    const socket = io()
    socket.on('connect', () => console.log('connected to socket'))
    socket.on('data', (data) => setGame(JSON.parse(data)))    
    socket.emit('join room', gameId)

    setSocket(socket)
  }, [navigate, playerId])

  const handleLeaveGame = useCallback(async () => {
    setGame(await leaveGame(playerId, game.gameId))
    navigate('/', { replace: true })
    socket.close()
    setSocket(null)
  }, [navigate, playerId, socket, game])

  const handleCreateGame = useCallback(async (leftNumConfig, rightNumConfig, operatorConfig) => {
    const newGame = await createGame(playerId, leftNumConfig, rightNumConfig, operatorConfig)
    setGame(newGame)
    handleJoinGame('host', newGame.gameId)
    navigate('/game/play', { replace: true })
  }, [handleJoinGame, navigate, playerId, game])

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              handleJoinGame={ handleJoinGame }
              handleCreateGame={ handleCreateGame }
            />
          }
        ></Route>

        <Route path="game">
          <Route
            path="play"
            element={ <GamePage
                        game={ game }
                        setGame={ setGame }
                        handleLeaveGame={ handleLeaveGame }
                        playerId={ playerId }
                      /> }
          ></Route>

          <Route
            path="create"
            element={ <CreateGamePage handleSubmit={ handleCreateGame } /> }
          ></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
