import EditQuestion from "./EditQuestion"

const ListQuestions = ({ questions, lesson }) => {
    return (
        <>
            {questions.map(question => (
                <EditQuestion
                    key={question.questionId}
                    question={question}
                    lesson={lesson}
                />
            ))}
        </>
    )
}

export default ListQuestions