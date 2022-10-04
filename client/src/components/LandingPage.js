import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateGame from './CreateGame'
import JoinGame from './JoinGame'

const LandingPage = ({ handleJoinGame }) => {    
    const navigate = useNavigate()

    const redirectToCreateGamePage = useCallback((password) => {
        password === "admin" && navigate('/game/create')
    })

    return (
        <section className="landing-page margin-centered">
            <JoinGame handleSubmit={ handleJoinGame } />
            <CreateGame handleSubmit={ redirectToCreateGamePage }/>
        </section>
    )
}

export default LandingPage