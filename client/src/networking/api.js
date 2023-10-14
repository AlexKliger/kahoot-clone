export const createGame = async (hostId, options) => {
    const optionsList = [options]
    const body = JSON.stringify({
        hostId,
        configs: optionsList})
    return await POST('/game/create', body)
}

export const joinGame = async (playerId, playerName, gameId, socketId) => {
    const body = JSON.stringify({
        playerId,
        playerName,
        gameId,
        socketId
    })
    return await POST('/game/join', body)
}

export const leaveGame = async (playerId, gameId, socketId) => {
    const body = JSON.stringify({
        playerId,
        gameId,
        socketId
    })
    return await POST('/game/leave', body)
}

export const startGame = async (gameId) => {
    const body = JSON.stringify({ gameId })
    return await POST('/game/start', body)
}

export const resetGame = async (gameId) => {
    const body = JSON.stringify({ gameId })
    return await POST('/game/reset', body)
}

export const nextQuestion = async (gameId) => {
    const body = JSON.stringify({ gameId })
    return await POST('/game/questions/next', body)
}

export const prevQuestion = async (gameId) => {
    const body = JSON.stringify({ gameId })
    return await POST('/game/questions/previous', body)
}

export const submitAnswer = async (questionId, playerId, answerIndex) => {
    const body = JSON.stringify({ playerId, answerIndex })
    return await POST(`/game/questions/submitAnswer/${questionId}`, body)
}

async function POST(url, body) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body
        })

        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}