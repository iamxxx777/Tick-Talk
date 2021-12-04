import firebase from "firebase/app"
import { useHistory } from "react-router-dom"
import { useAuth } from '../../contexts/authContext'

import githubImage from "../../assets/GitHub.svg"

const Github = () => {

    const { providerSignIn } = useAuth();
    const history = useHistory();


    const signUp = async () => {

        const provider = new firebase.auth.GithubAuthProvider();
        try {
            const userAuth = await providerSignIn(provider);
            console.log(userAuth);

            // await axios.post(`${process.env.REACT_APP_API_URI}/auth/register`, {
            //     user: userAuth.user,
            // })
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
                <img src={githubImage} alt="github sign in" />
            </button>
        </div>
    )
}

export default Github
