import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { addDoc } from 'firebase/firestore'

const WaitingRoom = ({ lesson, setScore, gameId, gamesCollectionRef, listOfGames, setListOfGames }) => {
    const navigate = useNavigate()

    const signUpForQuiz = async () => {
        // create a new game if not already present
        const newGame = {
            gameId: gameId,
            players: [
                {
                    playerId: auth.currentUser.uid,
                    displayName: auth.currentUser.displayName,
                    score: 0,
                    finished: false
                }
            ]
        }

        // check if current game is present in the database
        const currentQuiz = listOfGames.filter((game) => game.gameId === gameId)
        if (currentQuiz.length === 0) {
            console.log(newGame)
            await addDoc(gamesCollectionRef, newGame)
            const allGames = [...listOfGames, newGame]
            setListOfGames(allGames)
            console.log(listOfGames)
        } else {
            currentQuiz[0].players.push({
                playerId: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                score: 0,
                finished: false
            })
        }
    }

    const startQuiz = () => {
        setScore(0)
        signUpForQuiz()
        navigate(`/lessons/${lesson.routeName}-quiz`)
    }

    return(
        <div className="waiting-room-container">
            <div className="waiting-room">
                <h3>{lesson.displayName} Quiz Guidelines</h3>
                <ul>
                    <li>
                        This quiz consists of {lesson.questions.length} questions.
                    </li>
                    <li>
                        Each question has four options and only one is correct. Select an option and click the submit button. The correct answer will then be displayed and you can move on to the next question.
                    </li>
                    <li>
                        There is no time limit.
                    </li>
                    <li>
                        Share the game id {gameId} with friends!
                    </li>
                </ul>
                <button 
                    className="start-quiz" 
                    tabIndex="0"
                    onClick={startQuiz}
                >
                    Start!
                </button>
            </div>
        </div>
    )
}

export default WaitingRoom