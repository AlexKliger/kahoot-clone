import JoinGame from './JoinGameForm'

const LandingPage = ({ handleJoinGame }) => {    

    return (
        <section className="page margin-centered">
            <JoinGame handleSubmit={ handleJoinGame } />
        </section>
    )
}

export default LandingPage