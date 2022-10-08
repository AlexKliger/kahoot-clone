import { useCallback, useState } from "react"

const CreateGame = ({ handleSubmit }) => {
    const [password, setPassword] = useState('')

    const onSubmit = useCallback(e => {
        handleSubmit(password)
        e.preventDefault()
    }, [password, handleSubmit])

    return (
        <form onSubmit={onSubmit}>
            <input
                type="password"
                value={password}
                placeholder={"password"}
                onChange={e => setPassword(e.target.value)}
            ></input>

            <input type="submit" value="Create Game"></input>
        </form>
    )
}

export default CreateGame