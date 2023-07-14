import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const AddQuestion = ({ lesson, question, setQuestion, options, setOptions, correctAnswer, setCorrectAnswer}) => {
    const navigate = useNavigate()

    let option1 = '', option2 = '', option3 = '', option4 = ''

    /* each entered option is an individual event and they all are updated
    into the options array */
    const createOptions1 = (e) => {
        option1 = e.target.value
    }

    const createOptions2 = (e) => {
        option2 = e.target.value
    }

    const createOptions3 = (e) => {
        option3 = e.target.value
    }

    const createOptions4 = (e) => {
        option4 = e.target.value
    }

    const createOptions = () => {
        const optionsArray = [option1, option2, option3, option4]
        setOptions(optionsArray)
    }

    /* add a new question to the lessons collection and then reset the 
    temporary states */
    const addNewQuestion = async (e) => {
        e.preventDefault()
        createOptions()
        console.log('options: ', options)
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
        console.log(newQuestion)
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
                    <label htmlFor="option1">Option 1: </label>
                    <input
                        id="option1"
                        type="text"
                        required
                        onChange={createOptions1}
                    />
                    <label htmlFor="option2">Option 2: </label>
                    <input
                        id="option2"
                        type="text"
                        required
                        onChange={createOptions2}
                    />
                    <label htmlFor="option3">Option 3: </label>
                    <input
                        id="option3"
                        type="text"
                        required
                        onChange={createOptions3}
                    />
                    <label htmlFor="option4">Option 4: </label>
                    <input
                        id="option4"
                        type="text"
                        required
                        onChange={createOptions4}
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