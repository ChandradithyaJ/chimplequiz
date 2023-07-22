import { Link, useNavigate } from "react-router-dom"
import { TiDeleteOutline } from 'react-icons/ti'
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const EditQuestion = ({ question, setQuestion, setOptions, setCorrectAnswer, lesson, listOfLessons, setListOfLessons }) => {
    const navigate = useNavigate()

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

    const deleteQuestion = async () => {
        console.log('question: ', question)
        const newQuestionsArray = lesson.questions.splice(lesson.questions.indexOf(question), 1)
        console.log('newQuestionsArray: ', newQuestionsArray)

        // delete from database
        await updateDoc(doc(db, 'lessons', lesson.id), {
            questions: newQuestionsArray
        })

        // delete locally
        const updatedListOfLessons = listOfLessons.map((subject) => {
            if (subject.lessonId === lesson.lessonId) {
                subject.questions = newQuestionsArray
            }
            return subject
        })
        setListOfLessons(updatedListOfLessons)

        console.log('question deleted')
        navigate('/editor')
    }

    return (
        <div className="edit-question-container-container">
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
            <div 
                className="delete-icon-container"
                onClick={deleteQuestion}
            >
                <TiDeleteOutline
                    size={50}
                />
            </div>
        </div> 
    )
}

export default EditQuestion