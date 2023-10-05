import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameDispatchContext } from '../../context/GameContext'
import JoinGame from './JoinGameForm'

const LandingPage = () => {    
    const { joinGame } = useContext(GameDispatchContext)
    const navigate = useNavigate()

    async function handleJoinGame(fields) {
        await joinGame(fields.name, fields.gameId)
        navigate('/game/play', { replace: true })
    }

    return (
        <section className="page margin-centered">
            <JoinGame handleSubmit={ handleJoinGame } />
        </section>
    )
}

export default LandingPage