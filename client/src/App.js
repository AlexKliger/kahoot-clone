// Package imports
import { useCallback, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { createGame, joinGame, leaveGame } from './util/api'
// Component imports
import CreateGamePage from './components/CreateGamePage'
import Game from './components/Game'
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

  const handleJoinGame = useCallback(async (playerName) => {
    setGame(await joinGame(playerId, playerName, 1))
    navigate('/game/play', { replace: true })

    const mySocket = new WebSocket('ws://localhost:5000')
    mySocket.addEventListener('open', () => {
      console.log('connection opened to websocket:', mySocket.url)
    })
    mySocket.addEventListener('message', e => {
      setGame(JSON.parse(e.data))
    })

    setSocket(mySocket)
  }, [navigate, playerId])

  const handleLeaveGame = useCallback(async () => {
    setGame(await leaveGame(playerId, 1))
    navigate('/', { replace: true })
    socket.close()
    setSocket(null)
  }, [navigate, playerId, socket])

  const handleCreateGame = useCallback(async (leftNumConfig, rightNumConfig, operatorConfig) => {
    setGame(await createGame(playerId, leftNumConfig, rightNumConfig, operatorConfig))
    handleJoinGame('host')
    navigate('/game/play', { replace: true })
  }, [handleJoinGame, navigate, playerId])

  return (
    <div className="App">
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
            element={ <Game
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
