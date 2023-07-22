import EditQuestion from "./EditQuestion"

const ListQuestions = ({ questions, setQuestion, setOptions, setCorrectAnswer, lesson, listOfLessons, setListOfLessons }) => {
    return (
        <>
            {questions.map(question => (
                <EditQuestion
                    key={question.questionId}
                    question={question}
                    setQuestion={setQuestion}
                    setOptions={setOptions}
                    setCorrectAnswer={setCorrectAnswer}
                    lesson={lesson}
                    listOfLessons={listOfLessons}
                    setListOfLessons={setListOfLessons}
                />
            ))}
        </>
    )
}

export default ListQuestions