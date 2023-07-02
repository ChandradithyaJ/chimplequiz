import AboutField from './LoginPageComponents/AboutField'
import Login from './LoginPageComponents/Login'

const LoginPage = ({ setIsAutheticated }) => {
    return(
        <div>
            <AboutField />
            <Login 
                setIsAutheticated={setIsAutheticated}
            />
        </div>
    )
}

export default LoginPage