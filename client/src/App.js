// Package imports
import { useCallback, useState } from 'react'
import { uid } from 'uid'
import { joinGame } from './util/api'
// Component imports
import Game from './components/Game'
import './App.css';

!localStorage.getItem('userId') && localStorage.setItem('userId', uid(4))

function App() {
  const [playerId, setPlayerId] = useState(localStorage.getItem('userId'))
  const [game, setGame] = useState()
  const [socket, setSocket] = useState()

  const handleJoinGame = useCallback(async () => {
    setGame(await joinGame(playerId, 1))
    setSocket(new WebSocket('ws://localhost:5000'))
    socket.addEventListener('open', () => {
      console.log('connection opened to websocket:', socket && socket.url)
    })

    socket.addEventListener('message', e => {
      socket.readyState === WebSocket.OPEN && setGame(JSON.parse(e.data))
    })
  })

  const handleLeaveGame = useCallback(async () => {
    console.log('handleLeaveGame')
  })

  return (
    <div className="App">
      {!socket ?
      <button onClick={handleJoinGame}>Join Game</button>
      :
      <Game game={game} handleLeaveGame={handleLeaveGame} />      }
    </div>
  );
}

export default App;
