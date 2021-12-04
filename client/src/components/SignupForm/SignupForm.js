import { useState, useEffect } from 'react'
import { useAuth } from "../../contexts/authContext"
import { useHistory } from "react-router-dom"
import axios from "axios"

const SignupForm = () => {

    const { basicSignup, updateDetails } = useAuth();
    const history = useHistory();
    
    const [authError, setError] = useState({
        type: null,
        message: null
    });

    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        setError({
            type: null,
            message: null
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const password2 = e.target.password2.value;

        if (password !== password2) {
            return errorHandler({field: 'password', code: 'no-match'})
        }

        try {
            setLoading(true);
            const createdUser = await basicSignup(email, password);
            const { data } = await axios.post("/api/profile", {
                user: createdUser.user,
                name
            });

            await updateDetails(name, data.photo);
            
            history.push("/");

            setLoading(false);
        } catch (error) {
            errorHandler(error);
            setLoading(false);
        }

    }

    const errorHandler = (error) => {
        const code = error.code;
        if(code === 'auth/weak-password') return setError({type: 'password', message: 'Password should be at least 6 characters'});
        if(code === 'auth/email-already-in-use') return setError({type: 'user', message: 'This mail is already in use!'});
        if(code === 'auth/internal-error') return setError({type: 'firebase', message: 'Something went wrong, try again.'});
        if(code === 'no-match') return setError({ type: error.field, message: 'Passwords do not match.'});

        return;
    }

    useEffect(() => {
        return () => {}
    }, []);

    return (
        <div className="form">
            <form onSubmit={handleSubmit} onChange={handleChange}>
                {authError.type === 'user' ? <p className="error-msg">* {authError.message}</p> : null}
                <div className="form_control">
                    <label><i className="fa fa-envelope" aria-hidden="true"></i></label>
                    <input type="email" name="email" required placeholder="Email..." />
                </div>
                <div className="form_control">
                    <label><i className="fa fa-user" aria-hidden="true"></i></label>
                    <input type="text" name="name" required placeholder="Name..." />
                </div>
                {authError.type === 'password' ? <p className="error-msg">* {authError.message}</p> : null}
                <div className="form_control">
                    <label><i className="fa fa-lock" aria-hidden="true"></i></label>
                    <input type="password" name="password" required placeholder="Password..." />
                </div>
                {authError.type === 'password2' ? <p className="error-msg">* {authError.message}</p> : null}
                <div className="form_control">
                    <label><i className="fa fa-lock" aria-hidden="true"></i></label>
                    <input type="password" name="password2" required placeholder="Confirm Password..." />
                </div>
                {authError.type === 'firebase' ? <p className="error-msg">* {authError.message}</p> : null}
                <button 
                    style={loading ? {pointerEvents: "none"} : null} type="submit"
                >{loading ? <i className="fa fa-spinner" aria-hidden="true"></i> : "SignUp Now"}</button>
            </form>
        </div>
    )
}

export default SignupForm
