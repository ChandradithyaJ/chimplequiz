import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import ListPastQuiz from "./HistoryPageComponents/ListPastQuiz"
import { getDocs } from "firebase/firestore"

const HistoryPage = ({ history, setHistory, gamesCollectionRef, listOfLessons, setListOfGames}) => {
    const navigate = useNavigate()
    const returnToHomePage = () => {
        navigate('/home')
    }

    const extractQuizDetails = (quizLink) => {
        let indexOfHash = quizLink.indexOf('#')
        let lessonTitle = quizLink.substring(0, indexOfHash)

        const requiredLessonArray = listOfLessons.filter((lesson) => lesson.routeName === lessonTitle)
        return requiredLessonArray[0].displayName
    }

    const sortByDate = (details1, details2) => {
        // sort history based date of quiz
        const date1 = new Date(details1.date)
        const date2 = new Date(details2.date)
        if (date1 < date2) {
            return 1;
        } else if (date1 === date2) {
            return 0;
        } else {
            return -1;
        }
    }

    const fetchHistory = async () => {
        try {
            let participatedGames = []
            // read in all game data
            const Games = await getDocs(gamesCollectionRef)
            const gamesData = Games.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setListOfGames(gamesData)
            for(const game of gamesData){
                for(const player of game.players){
                    if(player.playerId === auth.currentUser.uid && player.finished === true){
                        const details = {
                            lessonName: extractQuizDetails(game.gameId),
                            score: player.score,
                            date: player.date,
                            key: game.gameId
                        }
                        participatedGames.push(details)
                        break
                    }
                }
            }
            setHistory(participatedGames)
            participatedGames.sort(sortByDate)
            
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
        fetchHistory()
    }, [history])

    return(
        <div className="history-page">
            <h3>Your Quiz History</h3>
            { history.length ? (
                <ListPastQuiz 
                    history={history}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    Start with a quiz right now!
                </p>
            )}
            <div className="return-home-from-history" role="button" tabIndex="100" onClick={returnToHomePage}>
                Go back to the Home Page
            </div>
        </div>
    )
}

export default HistoryPage