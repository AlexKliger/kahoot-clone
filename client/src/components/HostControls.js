import {resetGame, nextQuestion, prevQuestion, submitAnswer, startGame } from '../util/api'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const HostControls = ({ game, setGame, playerId }) => {
    return (
        <div className="host-controls">
            {game.hostId === playerId &&
                <>
                    {game.state === GAME_STATE.WAITING_FOR_PLAYERS
                    ?
                    <button className="host-controls__bottom-button" onClick={async () => setGame(await startGame(game.gameId))}>Start Game</button>
                    :
                    <>
                    <button className="host-controls__prev-button" onClick={async () => setGame(await prevQuestion(game.gameId))}>Prev</button>
                    <button className="host-controls__next-button" onClick={async () => setGame(await nextQuestion(game.gameId))}>Next</button>
                    <button className="host-controls__bottom-button" onClick={async () => setGame(await resetGame(game.gameId)) }>Reset Game</button>
                    </>
                    }
                </>
            }
        </div>
    )
}

export default HostControls