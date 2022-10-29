import { useNavigate } from "react-router-dom" 

const Header = () => {
    const navigate = useNavigate()

    return (
        <header className="header">
            <nav className="margin-centered" style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "width": "75%"}}>
                <h1 className="font-size--extra-large">Mathomizer</h1>
                <button
                    style={{"padding": "0.75rem"}}
                    className="font-size--medium"
                    onClick={() => navigate('/game/create')}
                >
                    Host a Game
                </button>
            </nav>
        </header>
    )
}

export default Header