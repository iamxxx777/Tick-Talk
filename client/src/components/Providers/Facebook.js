import firebase from "firebase/app"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { useAuth } from '../../contexts/authContext'

import facebookImage from "../../assets/Facebook.svg"

const Facebook = () => {

    const { providerSignIn } = useAuth();
    const history = useHistory();

    const signUp = async () => {

        const provider = new firebase.auth.FacebookAuthProvider();
        try {
            const userAuth = await providerSignIn(provider);
            await axios.post(`/auth/register`, {
                user: userAuth.user,
            })
            history.push("/");
        } catch (err) {
            if(err.code === 'auth/popup-closed-by-user') return;
            if(err.code === 'auth/cancelled-popup-request') return;
            if(err.code === 'auth/popup-blocked') return alert('Allow popups to log in with this service');
        } 
    }

    return (
        <div>
            <button onClick={signUp}>
                <img src={facebookImage} alt="facebook sign in" />
            </button>
        </div>
    )
}

export default Facebook
