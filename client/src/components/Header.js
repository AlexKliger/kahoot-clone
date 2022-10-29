import { Route, Routes, useNavigate } from "react-router-dom" 

const Header = ({ gameId }) => {
    const navigate = useNavigate()

    return (
        <header className="header">
            <nav className="margin-centered" style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "width": "75%"}}>
                <h1 className="font-size--extra-large">Mathomizer</h1>
                
                <Routes>
                    <Route
                        path='/'
                        element={
                            <button
                                style={{"padding": "0.75rem"}}
                                className="font-size--medium"
                                onClick={() => navigate('/game/create')}
                            >
                                Host a Game
                            </button>
                            }
                    ></Route>

                    <Route
                        path="/game/play"
                        element={
                            <span className="font-size--large">Game ID: {gameId}</span>
                        }
                    ></Route>
                </Routes>
            </nav>
        </header>
    )
}

export default Header