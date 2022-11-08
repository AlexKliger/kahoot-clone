const Players = ({ submittedAnswers, playerId, players }) => {
  console.log('Players( submittedAnswers:', submittedAnswers, '  playerId:', playerId, ')')
  console.log(Object.keys(submittedAnswers).includes(playerId))
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
          <span> {player.playerName}'s score: {player.score}</span>
        </li>
      ))
      }
    </ul>
  )
}

export default Players