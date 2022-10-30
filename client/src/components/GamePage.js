import GameScreen from './GameScreen'
import HostControls from './HostControls'
import Players from './Players'
import WaitingRoom from './WaitingRoom'

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const GamePage = ({ game, handleLeaveGame, setGame, playerId }) => {
    return (
        <section className="page page--game margin-centered">
            <div className="page--game__container">
                <div className="page--game__container__main">
                    {(game.state === GAME_STATE.WAITING_FOR_PLAYERS ||
                    game.state === GAME_STATE.GAME_ENDED) &&
                    <WaitingRoom game={game} setGame={setGame} playerId={playerId} />
                    }

                    {game.state === GAME_STATE.GAME_STARTED &&
                    <GameScreen game={game} setGame={setGame} playerId={playerId} />
                    }
                    
                    <HostControls game={game} setGame={setGame} playerId={playerId} />

                    <button style={{"padding": "0.5rem 1rem"}} onClick={ handleLeaveGame }>Leave Game</button>
                </div>

                <aside className="page--game__container__aside">
                    <Players players={game.players} />
                </aside>
            </div>
        </section>   
    )
}

export default GamePage