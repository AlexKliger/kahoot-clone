import { GET, DELETE, POST, PUT } from './fetch'

export const joinGame = async (playerId, gameId) => {
    const config = {body: JSON.stringify({playerId: playerId, gameId: gameId})}
    return await POST('http://localhost:5000/game/join', config)
}

export const leaveGame = async (playerId, roomId) => {
    const config = {body: JSON.stringify({playerId: playerId, roomId: roomId})}
    return await POST('http://localhost:5000/game/leave', config)
}