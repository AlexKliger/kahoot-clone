import { GET, DELETE, POST, PUT } from './fetch'

export const createGame = async (hostId, leftNumConfig, rightNumConfig, operatorConfig) => {
    const config = {body: JSON.stringify({
        hostId,
        leftNumConfig,
        rightNumConfig,
        operatorConfig })}
    return await POST('/game/create', config)
}

export const joinGame = async (playerId, playerName, gameId) => {
    const config = {body: JSON.stringify({
        playerId,
        playerName,
        gameId })}
    return await POST('/game/join', config)
}

export const leaveGame = async (playerId, gameId) => {
    const config = {body: JSON.stringify({ playerId, gameId })}
    return await POST('/game/leave', config)
}

export const startGame = async (gameId) => {
    const config = {body: JSON.stringify({ gameId })}
    return await POST('/game/start', config)
}

export const resetGame = async (gameId) => {
    const config = {body: JSON.stringify({ gameId })}
    return await POST('/game/reset', config)
}

export const nextQuestion = async (gameId) => {
    const config = {body: JSON.stringify({ gameId })}
    return await POST('/game/questions/next', config)
}

export const prevQuestion = async (gameId) => {
    const config = {body: JSON.stringify({ gameId })}
    return await POST('/game/questions/previous', config)
}

export const submitAnswer = async (questionId, playerId, answerIndex) => {
    const config = {body: JSON.stringify({ playerId, answerIndex })}
    return await POST(`/game/questions/submitAnswer/${questionId}`, config)
}