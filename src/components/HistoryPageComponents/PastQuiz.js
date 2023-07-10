const PastQuiz = ({ gameDetails }) => {
    return (
        <article className="past-quiz-container">
            <div className="past-quiz-results">
                <div className="past-quiz-details">
                    <p className="past-quiz-lesson-name">
                        {gameDetails.lessonName}
                    </p>
                    <p className="past-quiz-date">
                        {gameDetails.date}
                    </p>
                    <p className="past-quiz-score">
                        {gameDetails.score}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default PastQuiz