import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext, GameDispatchContext } from '../../context/GameContext'
import GameScreen from './GameScreen'
import HostControls from './HostControls'
import Players from './Players'
import WaitingRoom from './WaitingRoom'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const GamePage = ({ setGame, playerId }) => {
    const game = useContext(GameContext)
    const { leaveGame } = useContext(GameDispatchContext)

    const navigate = useNavigate()

    async function handleLeaveGame() {
        leaveGame()
        navigate('/')
    }

    return (
        <section className="page page--game margin-centered">
            <div className="page--game__container">
                <div className="page--game__container__main">
                    {(game.state === GAME_STATE.WAITING_FOR_PLAYERS ||
                    game.state === GAME_STATE.GAME_ENDED) &&
                    <WaitingRoom />
                    }

                    {game.state === GAME_STATE.GAME_STARTED &&
                    <GameScreen
                        question={game.questions[game.currentQuestion]}
                        setGame={setGame}
                        playerId={playerId}
                    />
                    }
                </div>

                <aside className="page--game__container__aside">
                    {game.state === GAME_STATE.GAME_STARTED &&
                    <h3 className="font-size--extra-large">Question {game.currentQuestion + 1}/{game.questions.length}</h3>}

                    <Players
                        players={game.players}
                        submittedAnswers={game.questions[game.currentQuestion].submittedAnswers}
                        playerId={playerId}
                    />

                    <HostControls game={game} setGame={setGame} playerId={playerId} />

                    <button style={{"padding": "0.5rem 1rem"}} onClick={ handleLeaveGame }>Leave Game</button>
                </aside>
            </div>
        </section>   
    )
}

export default GamePage