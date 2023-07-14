import { addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";

const NewLesson = ({ listOfLessons, setListOfLessons, lessonsCollectionRef, lessonName, setLessonName }) => {
    const navigate = useNavigate()

    // generate a route name from the display name entered
    const getRouteName = (displayName) => {
        const replacementCharacter = "_";
        return displayName.replace(/[\,\.\'\"\#\s\/]/g, replacementCharacter);
    }

    // add a new lesson to the lessons collection
    const addNewLesson = async () => {
        const newLesson = {
            displayName: lessonName, 
            routeName: getRouteName(lessonName),
            lessonId: listOfLessons.length + 1,
            questions: []
        }
        await addDoc(lessonsCollectionRef, newLesson)
        const updatedListOfLessons = [...listOfLessons, newLesson]
        setListOfLessons(updatedListOfLessons)
        navigate(`/editor/${lessonName}-add-questions`)
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
                <form className="add-lesson-form" onSubmit={addNewLesson}>
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