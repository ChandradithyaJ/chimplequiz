import { useEffect } from "react"
import { auth } from "../config/firebase"

const HistoryPage = ({ listOfGames, listOfLessons}) => {
    const extractQuizDetails = (quizLink) => {
        let indexOfHash = quizLink.indexOf('#')
        let lessonTitle = quizLink.substring(0, indexOfHash)

        const requiredLessonArray = listOfLessons.filter((lesson) => lesson.routeName === lessonTitle)
        return requiredLessonArray[0].displayName
    }

    useEffect(() => {
        const fetchHistory = () => {
            const participatedGameDetails = []
            for(const game of listOfGames){
                for(const player of game.players){
                    if (player.playerId === auth.currentUser.uid){
                        const details = {
                            lessonName: extractQuizDetails(game.gameId),
                            score: player.score,
                            date: player.date
                        }
                        participatedGameDetails.push(details)
                    }
                }
            }
        }

        fetchHistory()
        
    }, [listOfGames])

    return(
        <div className="history-page">
            <h3>Your History</h3>
        </div>
    )
}

export default HistoryPage