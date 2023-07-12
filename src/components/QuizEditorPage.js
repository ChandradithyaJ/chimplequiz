import { useNavigate } from "react-router-dom"
import ListLessons from "./EditorPageComponents/ListLessons"
import { useEffect } from "react"
import { getDocs } from "firebase/firestore"

const QuizEditorPage = (listOfLessons, setLesson) => {
    const navigate = useNavigate()

    const returnToHomePage = () => {
        console.log(listOfLessons)
        navigate('/home')
    }

    return (
        <main className="editor-page">
            <h3>List of Lessons</h3>
            {listOfLessons.listOfLessons.length ? (
                <ListLessons
                    listOfLessons={listOfLessons.listOfLessons}
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