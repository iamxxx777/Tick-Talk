import { Link } from 'react-router-dom'
import SignupForm from '../../components/SignupForm/SignupForm'
import Facebook from "../../components/Providers/Facebook"
import Github from "../../components/Providers/Github"
import Google from "../../components/Providers/Google"
import Logo from "../../assets/devchallenges-light.svg"

import "./Signup.css"

const SignUp = () => {

    return (
        <div className="container">
            <section className="signup_page">
                <div className="signup_logo">
                    <img src={Logo} alt="logo" />
                </div>
                <h1>Sign Up to Chatterbox </h1>
                <p>
                    Connect with people from all walks of life and engage in spirited conversations.
                </p>

                <SignupForm />

                <div className="oauth">
                    <p>Or continue with this social profiles</p>

                    <div className="auth">
                        <Google />
                        <Github />
                        <Facebook />
                    </div>

                    <div className="or">
                        <p>Already a user? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default SignUp
