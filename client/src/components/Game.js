import GameScreen from './GameScreen'
import WaitingRoom from './WaitingRoom'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const Game = ({ game, handleLeaveGame, setGame, playerId }) => {
    return (
        <section className="game flex-centered margin-centered">
            {(game.state === GAME_STATE.WAITING_FOR_PLAYERS ||
            game.state === GAME_STATE.GAME_ENDED) &&
            <WaitingRoom game={game} setGame={setGame} playerId={playerId} />
            }

            {game.state === GAME_STATE.GAME_STARTED &&
            <GameScreen game={game} setGame={setGame} playerId={playerId} />
            }
            
            <button onClick={ handleLeaveGame }>Leave Game</button>
        </section>   
    )
}

export default Game