import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"
import { v4 } from "uuid"

const HomePage = ({ setIsAutheticated, username, setUsername, setGameId }) => {
    const navigate = useNavigate()

    const goToLessons = () => {
        // generate a unique game id
        const uniqueGameId = v4()
        setGameId(uniqueGameId)
        
        navigate('/lessons')
    }

    const goToQuizEditor = () => {
        navigate('/editor')
    }

    const seePersonalHistory = () => {
        navigate('/history')
    }

    const logOut = async () => {
        try{
            await signOut(auth)
            setIsAutheticated(false)
            setUsername('')
            navigate('/login')
        } catch (err) {
            console.log(err.message)
        }
    }

    return(
        <div className="home-page">
            <h2>Welcome back, {username}!</h2>
            <div className="button-row">
                <button onClick={goToLessons}>
                    Take a quiz
                </button>
                <button onClick={goToQuizEditor}>
                    Quiz Editor
                </button>
                <button onClick={seePersonalHistory}>
                    History
                </button>
                <button onClick={logOut}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default HomePage