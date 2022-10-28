import { useCallback, useState } from "react"

const JoinGame = ({ handleSubmit }) => {
    const [name, setName] = useState('')
    const [gameId, setGameId] = useState('')

    const onSubmit = useCallback(e => {
        handleSubmit(name, gameId)
        e.preventDefault()
    }, [name, gameId])

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={name}
                placeholder="name"
                onChange={e => setName(e.target.value)}
            ></input>

            <input
                type="text"
                value={gameId}
                placeholder="game id"
                onChange={e => setGameId(e.target.value)}
            ></input>

            <input type="submit" value="Join Game"></input>
        </form>
    )
}

export default JoinGame