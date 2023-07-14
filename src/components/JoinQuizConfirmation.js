import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const JoinQuizConfirmation = ({ lesson, gameId, listOfGames }) => {
    const [returnHome, setReturnHome] = useState(false)
    const navigate = useNavigate()

    // if game is present, go to the waiting room; else, return home
    const confirm = () => {
        const requiredGameArray = listOfGames.filter((game) => gameId === game.gameId)
        if(requiredGameArray.length === 0){
            setReturnHome(true)
        } else{
            navigate(`/lessons/${lesson.routeName}-quiz-waiting-room`)
        }
    }

    const returnToHomePage = () => {
        navigate('/home')
    }

    useEffect(() => {
        // reload to show to return home button
        console.log('displaying home button')
    }, [returnHome])
    
    return(
        <div className="confirmation-container">    
            <div 
                className={!returnHome ? 
                "join-quiz-confirmation" : "hide-quiz-confirmation"}
            >
                <p>Click the button below to confirm</p>
                <button onClick={confirm} tabIndex="1">
                    Confirm
                </button>
            </div>
            <div
                className={!returnHome ? 'go-to-waiting-room' : 'return-to-home-page'}
            >
                <p>Sorry! The quiz link you entered doesn't seem to exist. Please refresh the page or ask for a resend.</p>
                <div className="return-home-from-confirmation" role="button" tabIndex="2" onClick={returnToHomePage}>
                    Go back to the Home Page
                </div>
            </div>
        </div>
    )
}

export default JoinQuizConfirmation