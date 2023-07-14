import { useNavigate } from "react-router-dom"
import { auth, db } from "../config/firebase"
import { setDoc, doc, updateDoc } from 'firebase/firestore'
import { MdContentCopy } from "react-icons/md"

const WaitingRoom = ({ lesson, setScore, gameId, listOfGames, setListOfGames }) => {
    const navigate = useNavigate()

    // store the date as a string
    function convertDateToString(datetimeObject) {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December']
        let monthName = datetimeObject.getMonth()
        monthName = monthNames[monthName]
        const dayOfMonth = datetimeObject.getDate()
        const year = datetimeObject.getFullYear()
        return `${monthName} ${dayOfMonth} ${year}`
    }

    const signUpForQuiz = async () => {
        // create a new game if not already present
        const todayDate = new Date()
        const newPlayer = [{
            playerId: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            score: 0,
            finished: false,
            date: convertDateToString(todayDate)
        }]
        const newGame = {
            gameId: gameId,
            players: newPlayer,
            id: gameId
        }

        // check if current game is present in the database
        const currentQuizArray = listOfGames.filter((game) => game.gameId === gameId)
        if (currentQuizArray.length === 0) {
            await setDoc(doc(db, "games", gameId), newGame)
            const allGames = [...listOfGames, newGame]
            setListOfGames(allGames)
        } else {
            // register the user in the database
            const currentGame = currentQuizArray[0]
            const gameToUpdate = doc(db, "games", currentGame.id)
            currentGame.players = [...currentGame.players, newPlayer[0]]
            const players = currentGame.players
            try {
                await updateDoc(gameToUpdate, { players: players })
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }
        }
    }

    // copy the link on focus and/or on clicking the button
    document.querySelectorAll(".copy-link").forEach(copyLinkField => {
        const inputField = copyLinkField.querySelector(".copy-link-input")
        const copyButton = copyLinkField.querySelector(".copy-link-button")

        inputField.addEventListener("focus", () => inputField.select())
        copyButton.addEventListener("click", () => {
            const link = inputField.value
            inputField.select()
            navigator.clipboard.writeText(link)
        })
    })

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
                        Share the game id below with friends!
                    </li>
                    <li className="copy-link">
                        <input 
                            type="text" 
                            className="copy-link-input"
                            readOnly
                            value={gameId}
                        />
                        <MdContentCopy 
                            className="copy-link-button"
                            role="button"
                            size={24}
                        />
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