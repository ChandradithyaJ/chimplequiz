import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const AddQuestion = ({ lesson, question, setQuestion, options, setOptions, correctAnswer, setCorrectAnswer}) => {
    const navigate = useNavigate()

    /* each entered option is an individual event and they all are updated
    into the options array */
    const createOptions = (e) => {
        const option = e.target.value
        const optionsArray = [...options, option]
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
            options: options,
            correctAnswer: correctAnswerInt
        }
        console.log('new question added: ', newQuestion)
        const newQuestionsArray = [...requiredDocData.questions, newQuestion]
        console.log(newQuestionsArray)
        await updateDoc(addQuestionTo, {questions: newQuestionsArray})
        setOptions([])
        setQuestion('')
        setCorrectAnswer(null)
        clearForm()
    }

    const returnToHomePage = () => {
        setOptions([])
        setQuestion('')
        setCorrectAnswer(null)
        navigate('/home')
    }

    return(
        <main className="add-new-question-page">
            <div className="add-new-question-container">
                <h2>Add New Question</h2>
                <div className="return-home-from-editor" role="button" tabIndex="100" onClick={returnToHomePage}>
                    Done adding questions? Return to the Home Page.
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
                        onChange={(e) => createOptions(e)}
                    />
                    <label htmlFor="option2">Option 2: </label>
                    <input
                        id="option2"
                        type="text"
                        required
                        onChange={(e) => createOptions(e)}
                    />
                    <label htmlFor="option3">Option 3: </label>
                    <input
                        id="option3"
                        type="text"
                        required
                        onChange={(e) => createOptions(e)}
                    />
                    <label htmlFor="option4">Option 4: </label>
                    <input
                        id="option4"
                        type="text"
                        required
                        onChange={(e) => createOptions(e)}
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