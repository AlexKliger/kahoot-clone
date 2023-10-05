import { useContext } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import { GameContext } from '../../context/GameContext'

const Header = () => {
    const navigate = useNavigate()
    const game = useContext(GameContext)

    return (
        <header className="header">
            <nav className="margin-centered" style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "width": "75%"}}>
                <h1 style={{"letterSpacing": "0.5rem"}} className="font-size--extra-large">MATHOMIZER</h1>
                
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
                            <span className="font-size--extra-large">Game ID: {game ? game.gameId : ''}</span>
                        }
                    ></Route>
                </Routes>
            </nav>
        </header>
    )
}

export default Header