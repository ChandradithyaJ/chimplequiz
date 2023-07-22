import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { updateDoc, doc } from "firebase/firestore";

const ChangeLessonTitle = ({ lesson, listOfLessons, setListOfLessons, lessonName, setLessonName }) => {
    const navigate = useNavigate()

    const returnToLessonEditor = () => {
        navigate(`/editor/${lesson.routeName}`)
    }

    // generate a route name from the display name entered
    const getRouteName = (displayName) => {
        const newRouteName = displayName
        const replacementCharacter = "_";
        const charactersToBeReplaced = ['\'', '.', ',', '#', '/', '\\', ' ']

        try{
            for (let i = 0; i < newRouteName.length; i++) {
                if (charactersToBeReplaced.includes(newRouteName[i])) {
                    newRouteName[i] = replacementCharacter
                }
            }
        } catch (err) {
            console.log(err.message)
        }

        console.log(newRouteName)
        return newRouteName
    }

    const updateLessonTitle = async (e) => {
        e.preventDefault()
        const updatedTitle = lessonName
        const updatedRouteName = getRouteName(updatedTitle)
        console.log(updatedTitle, updatedRouteName)

        // update in database
        const updatedLesson = doc(db, "lessons", lesson.id)
        await updateDoc(updatedLesson, {
            displayName: updatedTitle,
            routeName: updatedRouteName 
        })

        // update locally
        const updatedListOfLessons = listOfLessons.map((subject) => {
            if(subject.lessonId === lesson.lessonId){
                subject.displayName = updatedTitle
                subject.routeName = updatedRouteName
            }
            return subject
        })
        setListOfLessons(updatedListOfLessons)

        console.log('updated list of lessons: ', updatedListOfLessons)
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