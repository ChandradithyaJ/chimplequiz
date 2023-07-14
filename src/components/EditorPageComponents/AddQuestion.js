import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const AddQuestion = ({ lesson, question, setQuestion, options, setOptions, correctAnswer, setCorrectAnswer}) => {
    const navigate = useNavigate()

    /* each entered option is an individual event and they all are updated
    into the options array */
    const createOptions = (e) => {
        const option = e.target.value
        const newOptionsArray = [...options, option]
        setOptions(newOptionsArray)
    }

    /* add a new question to the lessons collection and then reset the 
    temporary states */
    const addNewQuestion = async (e) => {
        e.preventDefault()
        const addQuestionTo = doc(db, "lessons", lesson.routeName)
        const newQuestion = {
            question: question,
            questionId: lesson.questions.length + 1,
            options: options,
            correctAnswer: correctAnswer
        }
        console.log('new question added: ', newQuestion)
        const newQuestionsArray = [...lesson.questions, newQuestion]
        await updateDoc(addQuestionTo, {questions: newQuestionsArray})
        setOptions([])
        setQuestion('')
        setCorrectAnswer(null)
        navigate(`/editor/${lesson.routeName}-add-questions`)
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
                <form className="add-question-form" onSubmit={addNewQuestion}>
                    <label htmlFor="question">Question: </label>
                    <input
                        id="question"
                        type="text"
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <label htmlFor="option1">Option1: </label>
                    <input
                        id="option1"
                        type="text"
                        required
                        onChange={createOptions}
                    />
                    <label htmlFor="option2">Option2: </label>
                    <input
                        id="option2"
                        type="text"
                        required
                        onChange={createOptions}
                    />
                    <label htmlFor="option3">Option3: </label>
                    <input
                        id="option3"
                        type="text"
                        required
                        onChange={createOptions}
                    />
                    <label htmlFor="option4">Option4: </label>
                    <input
                        id="option4"
                        type="text"
                        required
                        onChange={createOptions}
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