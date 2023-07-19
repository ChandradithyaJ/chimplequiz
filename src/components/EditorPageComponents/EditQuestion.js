import { Link } from "react-router-dom"

const EditQuestion = ({ question, setQuestion, setOptions, setCorrectAnswer, lesson }) => {
    const goToQuestion = () => {
        console.log('editing question')
        try{
            setOptions(question.options)
            setCorrectAnswer(question.correctAnswer)
            setQuestion(question.question)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <article className="edit-question-container">
            <Link
                to={`/editor/${lesson.routeName}/${question.questionId}`}
                onClick={goToQuestion}
                className="edit-question"
            >
                <div className="edit-question-details">
                    <p className="edit-question-name">
                        {question.question}
                    </p>
                </div>
            </Link>
        </article>
    )
}

export default EditQuestion