import { useNavigate } from "react-router-dom"
import ListLessons from "./EditorPageComponents/ListLessons"

const QuizEditorPage = ({listOfLessons, setLesson}) => {
    const navigate = useNavigate()

    const addNewLesson = () => {
        navigate('/editor/add-new-lesson')
    }

    const returnToHomePage = () => {
        navigate('/home')
    }

    return (
        <main className="editor-page">
            <h3>List of Lessons</h3>
            {listOfLessons.length ? (
                <ListLessons
                    listOfLessons={listOfLessons}
                    setLesson={setLesson}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    Start by adding a lesson now!
                </p>
            )}
            <div 
                className="add-new-lesson" 
                role="button" 
                tabIndex="99"
                onClick={addNewLesson}
            >
                Add new lesson
            </div>
            <div className="return-home-from-editor" role="button" tabIndex="100" onClick={returnToHomePage}>
                Go back to the Home Page
            </div>
        </main>
    )
}

export default QuizEditorPage