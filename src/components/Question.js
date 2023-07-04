import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../config/firebase"
import { updateDoc, doc } from "firebase/firestore"

const Question = ({ lesson, score, setScore, gameId, listOfGames }) => {
    const [questionNum, setQuestionNum] = useState(1)
    const [selectedOption, setSelectedOption] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const navigate = useNavigate()

    const selectOption = (option) => {
        if(submitted === false){
            setSelectedOption(option)
        }
    }

    useEffect(() => {
        /* load next question or result */
    }, [questionNum, submitted])

    const submitOption = () => {
        const correctOption = lesson.questions[questionNum-1].options[lesson.questions[questionNum-1].correctAnswer-1]

        if(selectedOption !== null && submitted === false){
            if(questionNum === 1){
                score = 0 // reset to prevent cheating
            }

            if(selectedOption === correctOption){
                setIsCorrect(true)
                setScore(score+1)
            } else{
                setIsCorrect(false)
            }
            setSubmitted(true)
        }
    }

    const goToNextQuestion = async () => {
        window.history.replaceState("/home", '')
        if (selectedOption !== null && lesson.questions.length > questionNum) {
            setQuestionNum(questionNum + 1)
            setSelectedOption(null)
            setSubmitted(false)
            setIsCorrect(false)
        } else if (selectedOption !== null && lesson.questions.length <= questionNum) {
            setQuestionNum(1)
            setSelectedOption(null)
            setSubmitted(false)
            setIsCorrect(false)
            
            // update the game status in the database
            const currentGameArray = listOfGames.filter((game) => game.gameId === gameId)
            const currentGame = currentGameArray[0]
            const gameToUpdate = doc(db, "games", currentGame.id)
            const requiredPlayer = currentGame.players.find((player) => player.playerId === auth.currentUser.uid)
            const index = currentGame.players.indexOf(requiredPlayer)
            currentGame.players[index].score = score
            currentGame.players[index].finished = true
            const players = currentGame.players
            try {
                await updateDoc(gameToUpdate, {players: players})
            } catch (err) {
                console.log(`Error: ${err.message}`)
            }

            navigate(`/lessons/${lesson.routeName}-quiz-results`)
        }
    }

    return(
        <div className="question-page-container">
            <div className="trivia-container">
                <div className="question-container">
                    <div className="question">
                        {lesson.questions[questionNum-1]?.question}
                    </div>
                </div>
                <div className="answer-container">
                    {lesson.questions[questionNum-1].options.map((option) => (
                        <div 
                            className={selectedOption === option ? 'selectedAnswer' : 'answer'}
                            onClick={() => selectOption(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
                <div
                    className="submit-button"
                    role="button"
                    tabIndex="5"
                    onClick={submitOption}
                >
                    Submit
                </div>
            </div>
            <div className={submitted === true ? "show-current-result" : "hide-current-result"}>
                <p>
                    {isCorrect === true ? 
                    "Congrats! Your answer is correct!" : 
                        `Sorry! The right answer is ${lesson.questions[questionNum-1].options[lesson.questions[questionNum-1].correctAnswer - 1]}.`
                    }
                </p>
                <p>Your current score is: {score}</p>
                <div
                    className="next-question"
                    role="button"
                    onClick={goToNextQuestion}
                >
                    {questionNum === lesson.questions.length ?
                    "See Results" :
                    "Next Question"}
                </div>
            </div>
        </div>
    )
}

export default Question