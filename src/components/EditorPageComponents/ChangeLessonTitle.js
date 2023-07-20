import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";

const ChangeLessonTitle = ({ lesson, lessonName, setLessonName }) => {
    const navigate = useNavigate()

    const returnToLessonEditor = () => {
        navigate(`/editor/${lesson.routeName}`)
    }

    // generate a route name from the display name entered
    const getRouteName = (displayName) => {
        const replacementCharacter = "_";
        const charactersToBeReplaced = ['\'', '.', ',', '#', '/', '\\', ' ']
        for (let i = 0; i < displayName.length; i++) {
            if (charactersToBeReplaced.includes(displayName[i])) {
                displayName[i] = replacementCharacter
            }
        }
        console.log(displayName)
        return displayName
    }

    const updateLessonTitle = async (e) => {
        e.preventDefault()
        const updatedTitle = lessonName
        const updatedRouteName = getRouteName(updatedTitle)
        
        console.log(updatedTitle, updatedRouteName)
        const updatedLesson = doc(db, "lessons", lesson.id)
        await updateDoc(updatedLesson, {
            displayName: updatedTitle,
            routeName: updatedRouteName 
        })
        console.log('updated title')
        navigate(`/editor/${lesson.routeName}`)
    }

    return(
        <main className="add-new-lesson-page">
            <div className="add-new-lesson-container">
                <h2>Change Lesson Name</h2>
                <div className="return-home-from-editor" role="button" tabIndex="100" onClick={returnToLessonEditor}>
                    Return to the Lesson Editor
                </div>
                <form
                    className="add-lesson-form"
                    onSubmit={updateLessonTitle}
                >
                    <label htmlFor="lesson-name">Lesson Name: </label>
                    <input
                        id="lesson-name"
                        type="text"
                        required
                        value={lessonName}
                        onChange={(e) => setLessonName(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    )
}

export default ChangeLessonTitle;