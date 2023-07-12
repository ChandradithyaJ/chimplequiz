import { Link } from "react-router-dom"
import { MdOutlineQuiz } from "react-icons/md"

const EditLesson = ({ lesson, setLesson }) => {
    const goToEditLesson = () => {
        setLesson(lesson)
    }

    return(
        <article className="edit-lesson-container">
            <Link
                to={`/editor/${lesson.routeName}`}
                className="edit-lesson"
                onClick={goToEditLesson}
            >
                <div className="md-outline-container">
                    <MdOutlineQuiz
                        aria-label='Quiz'
                        size={30}
                        tabIndex="1"
                        color="whitesmoke"
                    />
                </div>
                <div className="edit-lesson-details">
                    <p className="edit-lesson-name">
                        {lesson.displayName}
                    </p>
                    <p className="edit-question-count">
                    {`(${lesson.questions.length} questions)`}
                    </p>
                </div>
            </Link>
        </article>
    )
}

export default EditLesson