import AboutField from './LoginPageComponents/AboutField'
import Login from './LoginPageComponents/Login'

const LoginPage = ({ setUsername }) => {
    return(
        <div>
            <AboutField />
            <Login 
                setUsername={setUsername}
            />
        </div>
    )
}

export default LoginPage