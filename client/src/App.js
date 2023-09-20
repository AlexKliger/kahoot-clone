// Package imports
import { useCallback, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { io } from 'socket.io-client'
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

  const handleCreateGame = useCallback(async (configs) => {
    const newGame = await createGame(playerId, configs)
    setGame(newGame)
    handleJoinGame('host', newGame.gameId)
    navigate('/game/play', { replace: true })
  }, [handleJoinGame, navigate, playerId, game])

  return (
    <div className="app">
      <Header gameId={game ? game.gameId : ""} />

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
