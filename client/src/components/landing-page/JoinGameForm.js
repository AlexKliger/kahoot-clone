import { useCallback, useState } from "react"

const inputStyle = "text-black border-2 borde-grey-400"

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
        <form className="join-game-form bg-white p-4 rounded" onSubmit={ onSubmit }>
            <input
                className={"join-game-form__input font-size--medium " + inputStyle}
                type="text"
                name="name"
                value={ fields.name }
                placeholder="Name"
                onChange={ onChange }
                required
            ></input>

            <input
                className={"join-game-form__input font-size--medium " + inputStyle}
                type="text"
                name="gameId"
                value={ fields.gameId }
                placeholder="Game ID"
                onChange={ onChange }
                required
            ></input>

            <input
                className="join-game-form__input font-size--medium border-2 border-stone-800 bg-stone-700 cursor-pointer"
                type="submit"
                value="Join Game"
            ></input>
        </form>
    )
}

export default JoinGameForm