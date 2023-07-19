import AboutField from './LoginPageComponents/AboutField'
import Login from './LoginPageComponents/Login'

const LoginPage = ({ setUsername, setIsAuthenticated }) => {
    return(
        <div>
            <AboutField />
            <Login 
                setUsername={setUsername}
                setIsAuthenticated={setIsAuthenticated}
            />
        </div>
    )
}

export default LoginPage