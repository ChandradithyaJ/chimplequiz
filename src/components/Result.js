import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ListPlayers from './ResultPageComponents/ListPlayers'
import { onSnapshot, getDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"

const Result = ({ setScore, players, setPlayers, gameId }) => {
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
            console.log('fetch results')
            let playersList = []
            // read in the required game
            const gameRef = doc(db, "games", gameId)
            const gameDoc = await getDoc(gameRef)
            const currentGame = gameDoc.data()
            playersList = currentGame.players
            playersList.sort(sortInDescending)
            setPlayers(playersList)
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
    }, [])

    useEffect(() => {
        // update players list
        console.log("on snapshot triggered in results page")
        onSnapshot(doc(db, "games", gameId), (doc) => {
            const updatedPlayersList = doc.data().players
            console.log(updatedPlayersList)
            updatedPlayersList.sort(sortInDescending)
            setPlayers(updatedPlayersList)
        })
    }, [])

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