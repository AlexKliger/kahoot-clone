import {resetGame, nextQuestion, prevQuestion, startGame } from '../../networking/api'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const HostControls = ({ game, playerId }) => {
    return (
        <div className="host-controls">
            {game.hostId === playerId &&
                <>
                    {game.state === GAME_STATE.WAITING_FOR_PLAYERS
                    ?
                    <button
                        className="host-controls__bottom-button"
                        onClick={async () => await startGame(game.gameId)}
                    >
                        Start Game
                    </button>
                    :
                    <>
                    <button
                        className="host-controls__prev-button"
                        onClick={ async () => await prevQuestion(game.gameId) }
                    >
                        Prev
                    </button>

                    <button
                        className="host-controls__next-button"
                        onClick={ async () => await nextQuestion(game.gameId) }
                    >
                        Next
                    </button>

                    <button
                        className="host-controls__bottom-button"
                        onClick={ async () => await resetGame(game.gameId) }
                    >
                        Reset Game
                    </button>
                    </>
                    }
                </>
            }
        </div>
    )
}

export default HostControls