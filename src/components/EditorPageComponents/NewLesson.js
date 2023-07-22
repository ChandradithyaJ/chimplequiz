import { setDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const NewLesson = ({ listOfLessons, setListOfLessons, lesson, setLesson, lessonName, setLessonName }) => {
    const navigate = useNavigate()

    // generate a route name from the display name entered
    const getRouteName = (displayName) => {
        const replacementCharacter = "_";
        const charactersToBeReplaced = ['\'', '.', ',', '#', '/', '\\', ' ']
        for(let i = 0; i < displayName.length; i++){
            if(charactersToBeReplaced.includes(displayName[i])){
                displayName[i] = replacementCharacter
            }
        }
        console.log(displayName)
        return displayName
    }

    // add a new lesson to the lessons collection
    const addNewLesson = async () => {
        const newLesson = {
            displayName: lessonName, 
            routeName: getRouteName(lessonName),
            lessonId: listOfLessons.length + 1,
            questions: []
        }

        console.log('new lesson added', newLesson)

        // update in database
        await setDoc(doc(db, "lessons", newLesson.routeName), newLesson)
        setLesson(newLesson)

        // update locally
        const updatedListOfLessons = [...listOfLessons, newLesson]
        setListOfLessons(updatedListOfLessons)
    }

    const startAddingQuestions = async (e) => {
        e.preventDefault()
        await addNewLesson()
        try{
            navigate(`/editor/${getRouteName(lessonName)}-add-questions`)
        } catch (err) {
            console.log(err.message)
        }
    }

    const returnToHomePage = () => {
        navigate('/home')
    }

    return(
        <main className="add-new-lesson-page">
            <div className="add-new-lesson-container">
                <h2>Add New Lesson</h2>
                <div className="return-home-from-editor" role="button" tabIndex="100" onClick={returnToHomePage}>
                    Return to the Home Page
                </div>
                <form 
                    className="add-lesson-form" 
                    onSubmit={startAddingQuestions}
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

export default NewLesson