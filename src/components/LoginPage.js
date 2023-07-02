import AboutField from './LoginPageComponents/AboutField'
import Login from './LoginPageComponents/Login'

const LoginPage = ({ setIsAutheticated, setUsername }) => {
    return(
        <div>
            <AboutField />
            <Login 
                setIsAutheticated={setIsAutheticated}
                setUsername={setUsername}
            />
        </div>
    )
}

export default LoginPage