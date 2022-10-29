import { useCallback, useState } from "react"

const JoinGameForm = ({ handleSubmit }) => {
    const [name, setName] = useState('')
    const [gameId, setGameId] = useState('')

    const onSubmit = useCallback(e => {
        handleSubmit(name, gameId)
        e.preventDefault()
    }, [name, gameId])

    return (
        <form className="join-game-form" onSubmit={onSubmit}>
            <input
                className="join-game-form__input font-size--medium"
                type="text"
                value={name}
                placeholder="Name"
                onChange={e => setName(e.target.value)}
            ></input>

            <input
                className="join-game-form__input font-size--medium"
                type="text"
                value={gameId}
                placeholder="Game ID"
                onChange={e => setGameId(e.target.value)}
            ></input>

            <input
                className="join-game-form__input font-size--medium"
                type="submit"
                value="Join Game"
            ></input>
        </form>
    )
}

export default JoinGameForm