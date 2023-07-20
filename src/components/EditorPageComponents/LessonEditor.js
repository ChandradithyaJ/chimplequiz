import { useNavigate } from "react-router-dom"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import ListQuestions from './ListQuestions'

const LessonEditor = ({ lesson, setQuestion, setOptions, setCorrectAnswer }) => {
    const navigate = useNavigate()

    const changeLessonTitle = () => {
        navigate(`/editor/${lesson.routeName}-change-lesson-title`)
    }

    const addNewQuestion = () => {
        setQuestion('')
        setCorrectAnswer(null)
        setOptions([])
        navigate(`/editor/${lesson.routeName}-add-questions`)
    }

    // delete the lesson from firestore
    const deleteLesson = async () => {
        await deleteDoc(doc(db, "lessons", lesson.id))
        console.log(`${lesson.displayName} deleted`)
        navigate(`/editor`)
    }

    const returnToEditor = () => {
        navigate('/editor')
    }

    return(
        <main className="editor-page">
            <h3>{lesson.displayName}</h3>
            <div
                className="change-lesson-title"
                role="button"
                tabIndex="98"
                onClick={changeLessonTitle}
            >
                Change Lesson Name
            </div>
            <h3>Questions</h3>
            {lesson.questions.length ? (
                <ListQuestions
                    questions={lesson.questions}
                    setQuestion={setQuestion}
                    setOptions={setOptions}
                    setCorrectAnswer={setCorrectAnswer}
                    lesson={lesson}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    Start by adding a question now!
                </p>
            )}

            <div className="edit-buttons">
                <div
                    className="add-new-question"
                    role="button"
                    tabIndex="99"
                    onClick={addNewQuestion}
                >
                    Add new question
                </div>
                <div
                    className="delete-lesson"
                    role="button"
                    tabIndex="99"
                    onClick={deleteLesson}
                >
                    Delete lesson
                </div>
            </div>
            <div className="return-home-from-editor" role="button" tabIndex="100" onClick={returnToEditor}>
                Go back to Editor Page
            </div>
        </main>
    )
}

export default LessonEditor