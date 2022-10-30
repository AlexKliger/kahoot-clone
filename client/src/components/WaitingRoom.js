const WaitingRoom = ({ game, setGame, playerId }) => {
    return (
        <section className="waiting-room">
            <h2 style={{"marginBottom": "2rem"}} className="font-size--extra-large">Waiting for players...</h2>

            <form style={{"marginBottom": "2rem"}}>
                <input
                    type="text"
                ></input>

                <input
                    type="submit"
                    value="Change name"
                ></input>
            </form>
        </section>
    )
}

export default WaitingRoom