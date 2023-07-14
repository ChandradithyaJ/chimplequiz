import { Link } from "react-router-dom"

const EditQuestion = ({ question, lesson }) => {

    return (
        <article className="edit-lesson-container">
            <Link
                to={`/editor/${lesson.routeName}/${question.questionId}`}
                className="edit-lesson"
            >
                <div className="edit-question-details">
                    <p className="edit-question-name">
                        {question.question}
                    </p>
                    <p className="edit-option">
                        {question.options[0]}
                    </p>
                    <p className="edit-option">
                        {question.options[1]}
                    </p>
                    <p className="edit-option">
                        {question.options[2]}
                    </p>
                    <p className="edit-option">
                        {question.options[3]}
                    </p>
                    <p className="edit-correct-answer">
                        {question.correctAnswer}
                    </p>
                </div>
            </Link>
        </article>
    )
}

export default EditQuestion