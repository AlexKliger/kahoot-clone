// Package imports
import { useCallback, useState } from 'react'
import { uid } from 'uid'
import { joinGame, leaveGame, createGame } from './util/api'
// Component imports
import Game from './components/Game'
// CSS import
import './App.css';

!localStorage.getItem('playerId') && localStorage.setItem('playerId', uid(4))

function App() {
  const [playerId, setPlayerId] = useState(localStorage.getItem('playerId'))
  const [game, setGame] = useState()
  const [socket, setSocket] = useState()

  const handleJoinGame = useCallback(async () => {
    setGame(await joinGame(playerId, 1))
    
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
        <button onClick={() => createGame(playerId)}>Create Game</button>
        <button onClick={handleJoinGame}>Join Game</button>
      </div>
      :
      <Game game={game} setGame={setGame} handleLeaveGame={handleLeaveGame} playerId={playerId} />}
    </div>
  );
}

export default App;
