import { createContext, useEffect, useState } from 'react'
import { socket } from '../networking/socket'
import { joinGame as fetchJoinGame, createGame as fetchCreateGame, leaveGame as fetchLeaveGame } from '../networking/api'
import { uid } from 'uid'

export const GameContext = createContext(null)
export const GameDispatchContext = createContext(null)

!localStorage.getItem('playerId') && localStorage.setItem('playerId', uid(4))
const playerId = localStorage.getItem('playerId')
export default function GameProvider({ children }) {
    const [game, setGame] = useState()

    async function createGame(options) {
        const game = await fetchCreateGame(playerId, options) // Need to be in an array because of how backend works for now
        await joinGame('host', game.gameId)
    }

    async function joinGame(playerName, gameId) {
        await fetchJoinGame(playerId, playerName, gameId, socket.id)
    }

    async function leaveGame() {
        await fetchLeaveGame(playerId, game.gameId, socket.id)
    }

    useEffect(() => {
        socket.on('connect', () => console.log('connected to socket'))
        socket.on('data', (data) => setGame(JSON.parse(data)))
    }, [])

    return (
        <GameContext.Provider value={ game }>
            <GameDispatchContext.Provider value={{
                createGame,
                joinGame,
                leaveGame
            }}>
                {children}
            </GameDispatchContext.Provider>
        </GameContext.Provider>
    )
}