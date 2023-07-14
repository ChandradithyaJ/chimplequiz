import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const EditQuestionDetails = ({ lesson, options, setOptions, question, setQuestion, correctAnswer, setCorrectAnswer }) => {
    const navigate = useNavigate()

    /* retrieve the questionId from the route and use it to find the required
    question */
    const { id } = useParams()
    const requiredQuestion = lesson.questions.find(question => question.questionId === id)

    useEffect(() => {
        console.log(typeof(id))
        console.log('editing question')
        if (requiredQuestion) {
            setOptions(question.options)
            setQuestion(question.question)
            setCorrectAnswer(question.correctAnswer)
        }
    }, [])

    const createOptions = (e) => {
        const option = e.target.value
        const newOptionsArray = [...options, option]
        setOptions(newOptionsArray)
    }

    // update the question's fields
    const editQuestion = async (e) => {
        e.preventDefault()
        const lessonToEdit = doc(db, "lessons", lesson.id)
        for(const q in lesson.questions){
            if(q.questionId === id){
                q.question = question
                q.options = options
                q.correctAnswer = correctAnswer
                break
            }
        }
        const updatedQuestionsArray = lesson.questions
        await updateDoc(lessonToEdit, {questions: updatedQuestionsArray})
        navigate(`/editor/${lesson.routeName}`)
    }

    return(
        <main className="add-new-question-page">
            <div className="add-new-question-container">
                <h2>Edit Question</h2>
                <form className="add-question-form" onSubmit={editQuestion}>
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

export default EditQuestionDetails