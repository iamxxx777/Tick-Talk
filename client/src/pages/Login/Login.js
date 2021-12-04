import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/LoginForm'
import Facebook from "../../components/Providers/Facebook"
import Github from "../../components/Providers/Github"
import Google from "../../components/Providers/Google"
import Logo from "../../assets/devchallenges-light.svg"

import "./Login.css"

const Login = () => {
    return (
        <div className="container login">
            <section className="login_page">
                <div className="signup_logo">
                    <img src={Logo} alt="logo" />
                </div>
                <h1>Login</h1>

                <LoginForm />
                
                <div className="oauth">
                    <p>Or continue with this social profiles</p>

                    <div className="auth">
                        <Google />
                        <Github />
                        <Facebook />
                    </div>

                    <div className="or">
                        <p>Dont have an account yet? <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login
