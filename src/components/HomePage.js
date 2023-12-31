import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import { signOut } from "firebase/auth"

const HomePage = ({ username, setUsername, setIsAuthenticated }) => {
    const navigate = useNavigate()

    const goToLessons = () => {    
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
            console.log('signed out')
            setUsername('')
            setIsAuthenticated(false)
            navigate('/login')
        } catch (err) {
            console.log(err.message)
        }
    }

    return(
        <div className="home-page">
            <h2>Welcome back, {username !== '' ? username : auth.currentUser.displayName}!</h2>
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