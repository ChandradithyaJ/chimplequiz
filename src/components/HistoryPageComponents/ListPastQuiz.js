import PastQuiz from "./PastQuiz"

const ListPastQuiz = ({ history }) => {
    return(
        <>
            {history.map(gameDetails => (
                <PastQuiz
                    key={gameDetails.key}
                    gameDetails={gameDetails}
                />
            ))}
        </>
    )
}

export default ListPastQuiz