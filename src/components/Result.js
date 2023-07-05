import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ListPlayers from './ResultPageComponents/ListPlayers'

const Result = ({ setScore, listOfGames, gameId }) => {
    const sortInDescending = (player1, player2) => {
        // sort the players based on their score from highest to lowest
        if (player1.score < player2.score) {
            return 1;
        } else if (player1.score == player2.score) {
            return 0;
        } else {
            return -1;
        }
    }

    let players = []
    const fetchResults = () => {
        // get the requireed game from the list of games
        const requiredGameArray = listOfGames.filter((game) => game.gameId === gameId)
        const currentGame = requiredGameArray[0]
        players = currentGame.players
        players.sort(sortInDescending)
    }

    useEffect(() => {
        fetchResults()
    }, [listOfGames])

    const navigate = useNavigate()
    const returnToHomePage = () => {
        setScore(0)
        navigate('/home')
    }

    return(
        <main className="result-container">
            <h3>Results</h3>
            {players.length ? (
                <ListPlayers
                    players={players}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    Sorry! There has been an error displaying the results.
                </p>
            )}
            <div className="return-home" role="button" tabIndex="100" onClick={returnToHomePage}>
                Go back to the Home Page
            </div>
        </main>
    )
}

export default Result