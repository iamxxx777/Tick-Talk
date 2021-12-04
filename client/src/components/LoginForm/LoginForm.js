import { useState } from 'react'
import { useAuth } from "../../contexts/authContext"
import { useHistory } from "react-router-dom"

const LoginForm = () => {

    const { basicSignin } = useAuth();
    const history = useHistory();

    const [authError, setError] = useState({
        type: null,
        message: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await basicSignin(email, password);
            history.push("/");
        } catch (error) {
            errorHandler(error);
        }

    }

    const errorHandler = (error) => {
        const code = error.code;
        if(code === 'auth/wrong-password') return setError({type: 'password', message: 'Wrong password!'});
        if(code === 'auth/user-not-found') return setError({type: 'user', message: 'Invalid User!'});
        if(code === 'auth/internal-error') return setError({type: 'firebase', message: 'Something went wrong, try again.'});

        return;
    }


    return (
        <div className="form">
            <form 
                onSubmit={handleSubmit} 
                onChange={() => setError({type: null,message: null})}
            >
                {authError.type === 'user' ? <p className="error-msg">*{authError.message}</p> : null}
                <div className="form_control">
                    <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                    <input type="email" name="email" placeholder="Email..." required />
                </div>
                {authError.type === 'password' ? <p className="error-msg">*{authError.message}</p> : null}
                <div className="form_control">
                    <label><i className="fa fa-lock"></i></label>
                    <input type="password" name="password" placeholder="Password..." required />
                </div>
                {authError.type === 'firebase' ? <p className="error-msg">*{authError.message}</p> : null}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm
