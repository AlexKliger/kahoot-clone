const Game = ({ game }) => {
    console.log('Game(', game.players, ')')
    return (
        <section>
            <ul>
                <h3>Players</h3>
                {game.players.map(playerId => (
                    <li>{playerId}</li>
                ))}
            </ul>
        </section>   
    )
}

export default Game