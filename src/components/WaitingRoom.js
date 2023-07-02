import { useNavigate } from "react-router-dom"

const WaitingRoom = ({ lesson, setScore }) => {
    const navigate = useNavigate()

    const startQuiz = () => {
        setScore(0)
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