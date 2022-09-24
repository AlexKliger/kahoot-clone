const Game = ({ game, handleLeaveGame }) => {
    return (
        <section>
            <ul>
                <h3>Players</h3>
                {game.players.map((playerId, key) => (
                    <li key={key}>{playerId}</li>
                ))}
            </ul>
            <button onClick={handleLeaveGame}>Leave Game</button>
        </section>   
    )
}

export default Game