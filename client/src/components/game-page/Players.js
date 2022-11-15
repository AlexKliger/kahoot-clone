const Players = ({ submittedAnswers, players }) => {
  return(
    <ul className="players font-size--medium">
      <h3 className="players__header font-size--large">Players</h3>
      {
      players.map((player, key) => (
        <li
          className="players__username"
          key={key}
        >
          <i className={`fas fa-star ${!Object.keys(submittedAnswers).includes(player.playerId) ? "hidden" : ""}`}></i>
          <span style={{"font-weight": "bold"}}> {player.playerName}'s score: {player.score}</span>
        </li>
      ))
      }
    </ul>
  )
}

export default Players