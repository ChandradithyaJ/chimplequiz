import { useNavigate } from "react-router-dom"

const JoinQuizConfirmation = ({ lesson }) => {
    const navigate = useNavigate()

    const confirm = () => {
        navigate(`/lessons/${lesson.routeName}-quiz-waiting-room`)
    }
    
    return(
        <div className="confirmation-container">    
            <div className="join-quiz-confirmation">
                <p>Click the button below to confirm</p>
                <button onClick={confirm}>Confirm</button>
            </div>
        </div>
    )
}

export default JoinQuizConfirmation