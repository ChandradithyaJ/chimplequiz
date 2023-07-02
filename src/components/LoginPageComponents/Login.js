import { useNavigate } from "react-router-dom"
import { auth, googleProvider } from '../../config/firebase'
import { signInWithPopup } from "firebase/auth"

const Login = ({ setIsAutheticated, setUsername }) => {
    const navigate = useNavigate()

    const signIn = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
            setUsername(auth.currentUser.displayName)
            setIsAutheticated(true)
            navigate('/home')
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="login-bar">
            <div className="login-container" 
                role="button"
                tabIndex="0"
                onClick={signIn}
            >
                <img
                    src={require("../../images/google-logo.png")}
                    className="google-logo"
                    alt="Google Logo"
                />
                <p>Sign in with Google</p>
            </div>
        </div>
    )
}

export default Login