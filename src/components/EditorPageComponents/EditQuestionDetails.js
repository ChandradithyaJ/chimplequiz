import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const EditQuestionDetails = ({ lesson, listOfLessons, setListOfLessons, options, setOptions, question, setQuestion, correctAnswer, setCorrectAnswer }) => {
    const navigate = useNavigate()

    /* retrieve the questionId from the route and use it to find the required
    question */
    const { id } = useParams()

    const [option1, setOption1] = useState(options[0])
    const [option2, setOption2] = useState(options[1])
    const [option3, setOption3] = useState(options[2])
    const [option4, setOption4] = useState(options[3])

    /* each entered option is an individual event and they all are updated
    into the options array */
    const createOption1 = (e) => {
        setOption1(e.target.value)
    }

    const createOption2 = (e) => {
        setOption2(e.target.value)
    }

    const createOption3 = (e) => {
        setOption3(e.target.value)
    }

    const createOption4 = (e) => {
        setOption4(e.target.value)
    }

    let optionsArray = []
    const createOptions = () => {
        optionsArray = [option1, option2, option3, option4]
        console.log('options array: ', optionsArray)
        setOptions(optionsArray)
    }


    // update the question's fields
    const editQuestion = async (e) => {
        e.preventDefault()
        createOptions()
        const lessonToEdit = doc(db, "lessons", lesson.id)
        const updatedListOfLessons = listOfLessons
        const updatedQuestionsArray = lesson.questions
        for(const q of updatedQuestionsArray){
            if(q.questionId === Number(id)){
                console.log(q)
                q.question = question
                q.options = optionsArray
                q.correctAnswer = correctAnswer
                break
            }
        }
        console.log('updated array: ', updatedQuestionsArray)

        // update in database
        await updateDoc(lessonToEdit, {questions: updatedQuestionsArray})

        // update locally
        for(const subject of updatedListOfLessons){
            if(subject.lessonId === lesson.lessonId){
                subject.questions = updatedQuestionsArray
                break
            }
        }
        setListOfLessons(updatedListOfLessons)
        console.log('updated list of lessons: ', updatedListOfLessons)

        navigate(`/editor/${lesson.routeName}`)
    }

    const returnToLesson = () => {
        setOptions([])
        setQuestion('')
        setCorrectAnswer(null)
        navigate(`/editor/${lesson.routeName}`)
    }

    return(
        <main className="add-new-question-page">
            <div className="add-new-question-container">
                <h2>Add New Question</h2>
                <div className="return-home-from-editor" role="button" tabIndex="100" onClick={returnToLesson}>
                    Return to lesson
                </div>
                <form
                    className="add-question-form"
                    onSubmit={editQuestion}
                    id="question-form"
                >
                    <label htmlFor="question">Question: </label>
                    <input
                        id="question"
                        type="text"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <label htmlFor="option1">Option 1: </label>
                    <input
                        id="option1"
                        type="text"
                        required
                        value={option1}
                        onChange={(e) => createOption1(e)}
                    />
                    <label htmlFor="option2">Option 2: </label>
                    <input
                        id="option2"
                        type="text"
                        required
                        value={option2}
                        onChange={(e) => createOption2(e)}
                    />
                    <label htmlFor="option3">Option 3: </label>
                    <input
                        id="option3"
                        type="text"
                        required
                        value={option3}
                        onChange={(e) => createOption3(e)}
                    />
                    <label htmlFor="option4">Option 4: </label>
                    <input
                        id="option4"
                        type="text"
                        required
                        value={option4}
                        onChange={(e) => createOption4(e)}
                    />
                    <label htmlFor="correct-ans">Correct Answer (Option number): </label>
                    <input
                        id="correct-ans"
                        type="number"
                        min="1"
                        max="4"
                        required
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    )
}

export default EditQuestionDetails