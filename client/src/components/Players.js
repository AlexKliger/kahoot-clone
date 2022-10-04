const Players = ({ players }) => {
    return(
        <ul className="players font-size--medium">
            <h3 className="players__header font-size--large">Players</h3>
            {
            players.map((player, key) => (
                <li className="players__username" key={key}>{player.playerName}'s score: {player.score}</li>
            ))
            }
        </ul>
    )
}

export default Players