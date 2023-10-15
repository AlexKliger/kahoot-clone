const Players = ({ submittedAnswers, players }) => {
  return(
    <ul className="players font-size--medium">
      <h3 className="text-3xl mt-6">Players</h3>
      {
      players.map((player, key) => (
        <li
          className="players__username"
          key={key}
        >
          <i className={`fas fa-star ${!Object.keys(submittedAnswers).includes(player.playerId) ? "hidden" : ""}`}></i>
          <span style={{"font-weight": "bold"}}> {player.playerName}: {player.score}</span>
        </li>
      ))
      }
    </ul>
  )
}

export default Players