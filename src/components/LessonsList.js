import List from "./LessonsListComponents/List"
import { useNavigate } from "react-router-dom"

const LessonsList = ({ listOfLessons, setLesson, setScore, gameId }) => {
    const navigate = useNavigate()

    const returnToHomePage = () => {
        navigate('/home')
    }

    return (
        <main className="lessons-page">
            <h3>List of Lessons</h3>
            {listOfLessons.length ? (
                <List 
                    listOfLessons={listOfLessons}
                    setLesson={setLesson} 
                    setScore={setScore}
                    gameId={gameId}  
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    Sorry! No lessons present.
                </p>
            )}
            <div className="return-home" role="button" tabIndex="100" onClick={returnToHomePage}>
                Go back to the Home Page
            </div>
        </main>
    )
}

export default LessonsList