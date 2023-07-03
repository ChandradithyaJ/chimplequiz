import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Question = ({ lesson, score, setScore, gameId }) => {
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

    const goToNextQuestion = () => {
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