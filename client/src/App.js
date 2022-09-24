import { uid } from 'uid'
import { useCallback, useState } from 'react'
import { joinGame } from './util/api'
import './App.css';

!localStorage.getItem('userId') && localStorage.setItem('userId', uid(4))

function App() {
  const [playerId, setPlayerId] = useState(localStorage.getItem('userId'))
  const [game, setGame] = useState()
  const [socket, setSocket] = useState(localStorage.getItem('userId') && new WebSocket('ws://localhost:5000'))

  const handleJoinGame = useCallback(async () => {
    setGame(await joinGame(playerId, 1))
    socket.addEventListener('open', () => {
      console.log('connection opened to websocket:', socket && socket.url)
    })
  })

  return (
    <div className="App">
      <button onClick={handleJoinGame}>Join Game</button>
    </div>
  );
}

export default App;
