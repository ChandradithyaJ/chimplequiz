import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ListPlayers from './ResultPageComponents/ListPlayers'
import { getDocs } from "firebase/firestore"

const Result = ({ setScore, players, setPlayers, gameId, gamesCollectionRef, setListOfGames }) => {
    const sortInDescending = (player1, player2) => {
        // sort the players based on their score from highest to lowest
        if (player1.score < player2.score) {
            return 1;
        } else if (player1.score === player2.score) {
            return 0;
        } else {
            return -1;
        }
    }

    const fetchResults = async () => {
        try {
            let playersList = []
            // read in all game data
            const Games = await getDocs(gamesCollectionRef)
            const gamesData = Games.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setListOfGames(gamesData)
            const requiredGameArray = gamesData.filter((game) => game.gameId === gameId)
            const currentGame = requiredGameArray[0]
            playersList = currentGame.players
            setPlayers(playersList)
            playersList.sort(sortInDescending)
            console.log(players)
        } catch (err) {
            if (err.response) {
                // Not in the 200 response range
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    }

    useEffect(() => {
        fetchResults()
    }, [players])

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
                    {players.length}
                </p>
            )}
            <div className="return-home" role="button" tabIndex="100" onClick={returnToHomePage}>
                Go back to the Home Page
            </div>
        </main>
    )
}

export default Result