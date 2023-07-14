import { useNavigate } from "react-router-dom"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import ListQuestions from './ListQuestions'

const LessonEditor = ({ lesson }) => {
    const navigate = useNavigate()

    const addNewQuestion = () => {
        navigate(`/editor/${lesson.routeName}-add-questions`)
    }

    // delete the lesson from firestore
    const deleteLesson = async () => {
        await deleteDoc(doc(db, "lessons", lesson.id))
        navigate(`/editor`)
    }

    const returnToHomePage = () => {
        navigate('/home')
    }

    return(
        <main>
            <h3>Questions</h3>
            {lesson.questions.length ? (
                <ListQuestions
                    questions={lesson.questions}
                    lesson={lesson}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    Start by adding a question now!
                </p>
            )}
            <div
                className="add-new-lesson"
                role="button"
                tabIndex="99"
                onClick={addNewQuestion}
            >
                Add new lesson
            </div>
            <div
                className="add-new-lesson"
                role="button"
                tabIndex="99"
                onClick={deleteLesson}
            >
                Delete lesson
            </div>
            <div className="return-home-from-editor" role="button" tabIndex="100" onClick={returnToHomePage}>
                Go back to the Home Page
            </div>
        </main>
    )
}

export default LessonEditor