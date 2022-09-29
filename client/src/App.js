// Package imports
import { useCallback, useState } from 'react'
import { uid } from 'uid'
import { joinGame, leaveGame, createGame } from './util/api'
// Component imports
import Game from './components/Game'
import JoinGame from './components/JoinGame'
// CSS import
import './css/app.css';
import './css/modules.css'
import './css/themes.css'

!localStorage.getItem('playerId') && localStorage.setItem('playerId', uid(4))

function App() {
  const [playerId, setPlayerId] = useState(localStorage.getItem('playerId'))
  const [game, setGame] = useState()
  const [socket, setSocket] = useState()

  const handleJoinGame = useCallback(async (playerName) => {
    setGame(await joinGame(playerId, playerName, 1))
    
    const mySocket = new WebSocket('ws://localhost:5000')
    mySocket.addEventListener('open', () => {
      console.log('connection opened to websocket:', mySocket.url)
    })
    mySocket.addEventListener('message', e => {
      setGame(JSON.parse(e.data))
    })

    setSocket(mySocket)
  })

  const handleLeaveGame = useCallback(async () => {
    setGame(await leaveGame(playerId, 1))
    socket.close()
    setSocket(null)
  })

  return (
    <div className="App">
      {!socket ?
      <div>
        <button onClick={() => createGame(playerId)}>Claim Host</button>
        <JoinGame handleSubmit={handleJoinGame} />
      </div>
      :
      <Game game={game} setGame={setGame} handleLeaveGame={handleLeaveGame} playerId={playerId} />}
    </div>
  );
}

export default App;
