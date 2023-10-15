import {resetGame, nextQuestion, prevQuestion, startGame } from '../../networking/api'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const HostControls = ({ game, playerId }) => {
    return (
        <div className="host-controls text-white">
            {game.hostId === playerId &&
                <>
                    {game.state === GAME_STATE.WAITING_FOR_PLAYERS
                    ?
                    <button
                        className="host-controls__bottom-button border-2 border-stone-800 rounded bg-stone-700"
                        onClick={async () => await startGame(game.gameId)}
                    >
                        Start Game
                    </button>
                    :
                    <>
                    <button
                        className="host-controls__prev-button border-2 border-stone-800 rounded bg-stone-700"
                        onClick={ async () => await prevQuestion(game.gameId) }
                    >
                        <i className="fa fa-chevron-left"></i>
                    </button>

                    <button
                        className="host-controls__next-button border-2 border-stone-800 rounded bg-stone-700"
                        onClick={ async () => await nextQuestion(game.gameId) }
                    >
                        <i className="fa fa-chevron-right"></i>
                    </button>

                    <button
                        className="host-controls__bottom-button border-2 border-stone-800 rounded bg-stone-700"
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