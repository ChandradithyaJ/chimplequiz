import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddQuestion = ({ lesson, listOfLessons, setListOfLessons, question, setQuestion, options, setOptions, correctAnswer, setCorrectAnswer}) => {
    const navigate = useNavigate()

    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const [option3, setOption3] = useState('')
    const [option4, setOption4] = useState('')

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

    // reset form fields
    const clearForm = () => {
        document.getElementById('question-form').reset()
    }

    /* add a new question to the lessons collection and then reset the 
    temporary states */
    const addNewQuestion = async (e) => {
        e.preventDefault()
        createOptions()
        console.log('options: ', options)
        const addQuestionTo = doc(db, "lessons", lesson.routeName)
        const requiredDoc = await getDoc(addQuestionTo)
        const requiredDocData = requiredDoc.data()

        // get correct state for correctAnswer
        let correctAnswerInt = 0
        if(typeof(correctAnswer) === 'string'){
            correctAnswerInt = parseInt(correctAnswer)
        }

        const newQuestion = {
            question: question,
            questionId: requiredDocData.questions.length + 1,
            options: optionsArray,
            correctAnswer: correctAnswerInt
        }

        console.log('new question added: ', newQuestion)
        // update in database
        const newQuestionsArray = [...requiredDocData.questions, newQuestion]
        console.log('newQuestionsArray: ' ,newQuestionsArray)
        await updateDoc(addQuestionTo, {questions: newQuestionsArray})

        // update locally
        const updatedListOfLessons = listOfLessons
        for(const subject of updatedListOfLessons){
            if(subject.lessonId === lesson.lessonId){
                subject.questions = newQuestionsArray
                break
            }
        }
        setListOfLessons(updatedListOfLessons)
        console.log('updated list of lessons: ', updatedListOfLessons)

        setOptions([])
        setQuestion('')
        setCorrectAnswer(null)
        clearForm()
    }

    const returnToHomePage = () => {
        setOptions([])
        setQuestion('')
        setCorrectAnswer(null)
        navigate('/editor')
    }

    return(
        <main className="add-new-question-page">
            <div className="add-new-question-container">
                <h2>Add New Question</h2>
                <div className="return-home-from-editor" role="button" tabIndex="100" onClick={returnToHomePage}>
                    Done adding questions? Return to the Editor Page.
                </div>
                <form 
                    className="add-question-form" 
                    onSubmit={addNewQuestion}
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
                        onChange={(e) => createOption1(e)}
                    />
                    <label htmlFor="option2">Option 2: </label>
                    <input
                        id="option2"
                        type="text"
                        required
                        onChange={(e) => createOption2(e)}
                    />
                    <label htmlFor="option3">Option 3: </label>
                    <input
                        id="option3"
                        type="text"
                        required
                        onChange={(e) => createOption3(e)}
                    />
                    <label htmlFor="option4">Option 4: </label>
                    <input
                        id="option4"
                        type="text"
                        required
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

export default AddQuestion