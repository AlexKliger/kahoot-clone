import { useCallback, useState } from "react"

const JoinGameForm = ({ handleSubmit }) => {
    const [fields, setFields] = useState({name: '', gameId: ''})

    const onChange = useCallback(e => {
        const newFields = {...fields}
        newFields[e.target.name] = e.target.value
        setFields(newFields)
    }, [fields])

    const onSubmit = useCallback(async e => {
        e.preventDefault()
        await handleSubmit(fields)
    }, [fields])

    return (
        <form className="join-game-form" onSubmit={ onSubmit }>
            <input
                className="join-game-form__input font-size--medium"
                type="text"
                name="name"
                value={ fields.name }
                placeholder="Name"
                onChange={ onChange }
                required
            ></input>

            <input
                className="join-game-form__input font-size--medium"
                type="text"
                name="gameId"
                value={ fields.gameId }
                placeholder="Game ID"
                onChange={ onChange }
                required
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