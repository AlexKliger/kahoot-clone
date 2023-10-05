import { createContext, useEffect, useState } from 'react'
import { socket } from '../networking/socket'
import { joinGame as fetchJoinGame, createGame as fetchCreateGame } from '../networking/api'
import { uid } from 'uid'

export const GameContext = createContext(null)
export const GameDispatchContext = createContext(null)

!localStorage.getItem('playerId') && localStorage.setItem('playerId', uid(4))
const playerId = localStorage.getItem('playerId')
export default function GameProvider({ children }) {
    const [game, setGame] = useState()

    async function createGame(configs) {
        const game = await fetchCreateGame(playerId, configs)
        joinGame('host', game.gameId)
        setGame(game)
    }

    async function joinGame(playerName, gameId) {
        setGame(await fetchJoinGame(playerId, playerName, gameId))
        socket.emit('join room', gameId)
    }

    useEffect(() => {
        socket.on('connect', () => console.log('connected to socket'))
        socket.on('data', (data) => setGame(JSON.parse(data)))
    })

    // useEffect(() => {
    //     async function fetchGameData() {
    //         setGame(await joinGame(playerId, pla))
    //     }
    // })

    return (
        <GameContext.Provider value={ game }>
            <GameDispatchContext.Provider value={{
                createGame,
                joinGame
            }}>
                {children}
            </GameDispatchContext.Provider>
        </GameContext.Provider>
    )
}