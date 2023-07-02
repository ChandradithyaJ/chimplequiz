import { Link } from "react-router-dom"
import { MdOutlineQuiz } from 'react-icons/md'

const Lesson = ({ lesson, setLesson, setScore }) => {
    const goToWaitingRoom = () => {
        setScore(0)
        setLesson(lesson)
    }

    return(
        <article className="lesson-container">
            <Link 
                to={`/lessons/${lesson.routeName}-quiz-waiting-room`}
                className="lesson"
                onClick={goToWaitingRoom}
            >
                <div className="md-outline-container">
                    <MdOutlineQuiz
                        aria-label='Quiz'
                        size={30}
                        tabIndex="1"
                        color="whitesmoke"
                    />
                </div>
                <div className="lesson-details">
                    <p className="lesson-name">
                        {lesson.displayName}
                    </p>
                    <p className="question-count">
                        {`(${lesson.questions.length} questions)`}
                    </p>
                </div>
            </Link>
        </article>
    )
}

export default Lesson