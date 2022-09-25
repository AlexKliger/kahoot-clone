import { GET, DELETE, POST, PUT } from './fetch'

export const joinGame = async (playerId, gameId) => {
    const config = {body: JSON.stringify({playerId: playerId, gameId: gameId})}
    return await POST('http://localhost:5000/game/join', config)
}

export const leaveGame = async (playerId, gameId) => {
    const config = {body: JSON.stringify({playerId: playerId, gameId: gameId})}
    return await POST('http://localhost:5000/game/leave', config)
}

export const startGame = async (gameId) => {
    const config = {body: JSON.stringify({gameId: gameId})}
    return await POST('http://localhost:5000/game/start', config)
}