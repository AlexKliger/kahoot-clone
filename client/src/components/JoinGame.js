import { useCallback, useState } from "react"

const JoinGame = ({ handleSubmit }) => {
    const [name, setName] = useState('')

    const onSubmit = useCallback(e => {
        handleSubmit(name)
        e.preventDefault()
    }, [name])

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={name}
                placeholder="name"
                onChange={e => setName(e.target.value)}
            ></input>

            <input type="submit" value="Join Game"></input>
        </form>
    )
}

export default JoinGame