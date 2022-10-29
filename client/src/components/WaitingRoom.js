import Players from './Players'
import { startGame, resetGame } from '../util/api'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const WaitingRoom = ({ game, setGame, playerId }) => {
    return (
        <section className="waiting-room">
        <h2 className="font-size--extra-large">Waiting for players...</h2>
        <Players players={game.players} />
        {game.hostId === playerId &&
        <>
            {game.state === GAME_STATE.WAITING_FOR_PLAYERS ? 
            <button onClick={ async () => setGame(await startGame(game.gameId)) }>
                Start Game
            </button>
            :
            <button onClick={ async () => setGame(await resetGame(game.gameId)) }>
                Reset Game
            </button>
            }
        </>
        }       
        </section>
    )
}

export default WaitingRoom