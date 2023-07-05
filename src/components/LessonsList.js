import List from "./LessonsListComponents/List"
import { useNavigate } from "react-router-dom"

const LessonsList = ({ listOfLessons, lesson, setLesson, setScore, setGameId, quizLink, setQuizLink }) => {
    const navigate = useNavigate()

    const extractQuizDetails = () => {
        let indexOfHash = quizLink.indexOf('#')
        let lessonTitle = quizLink.substring(0, indexOfHash)


        setGameId(quizLink)
        const requiredLessonArray = listOfLessons.filter((lesson) => lesson.routeName === lessonTitle)
        setLesson(requiredLessonArray[0])
        
        navigate(`/lessons/join-quiz-confirmation`)
    }

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
                    setGameId={setGameId}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    Sorry! No lessons present.
                </p>
            )}
            <form className="join-quiz">
                <label htmlFor="quiz-link">
                    Enter shared link to join a quiz!
                </label>
                <input 
                    id="quiz-link"
                    required
                    placeholder="Enter Quiz Link"
                    type="text"
                    value={quizLink}
                    onChange={(e) => setQuizLink(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={extractQuizDetails}
                >
                    Join Quiz
                </button>
            </form>
            <div className="return-home" role="button" tabIndex="100" onClick={returnToHomePage}>
                Go back to the Home Page
            </div>
        </main>
    )
}

export default LessonsList