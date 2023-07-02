import { useNavigate } from "react-router-dom"

const Result = ({ score, setScore }) => {
    const navigate = useNavigate()
    const returnToHomePage = () => {
        setScore(0)
        navigate('/home')
    }

    return(
        <main className="result-container">
            <p>Your total score is: {score}</p>
            <div className="return-home" role="button" tabIndex="100" onClick={returnToHomePage}>
                Go back to the Home Page
            </div>
        </main>
    )
}

export default Result