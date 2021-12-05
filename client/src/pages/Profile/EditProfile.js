import { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
//import { toast } from 'react-toastify'
import { useAuth } from "../../contexts/authContext"

import ProfileNav from "../../components/ProfileNav/ProfileNav"
import Loader from "../../components/Loader/Loader"
import Error from "../../components/Error/Error"

import "./Edit.css"


const EditProfile = () => {

    const history = useHistory();
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const { currentUser, updateEmail, updatePassword, updatePhoto, updateName } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loadError, setLoadError] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    var promises = [];


    const setVariables = (data) => {
        setName(data.name);
        setEmail(data.email);

        if(data.phone) {
            setPhone(data.phone);
        }
        if(data.bio) {
            setBio(data.bio);
        }
    }


    const submitImage = async (image) => {
        try {
            let formData = new FormData();
            formData.append("image", image);
            formData.append('id', user._id);
            if(user.cloudId) {
                formData.append("cloudId", user.cloudId);
            }

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            const { data } = await axios.put("/api/profile/image", formData, config);

            await updatePhoto(data.url);

            if(data.success) {
                await updateUser();
            }

        } catch (error) {
            console.error(error);
            setError('Error uploading image, please select again');
        }
    }

    const handleForm = async (editData) => {
        const { data } = await axios.put(`/api/profile/${user._id}`, editData);
        return data;
    } 

    const submitForm = async (e) => {
        e.preventDefault();

        try {

            if(password) {
                if (password !== password2) {
                    setError("passwords do not match");
                } else {
                    promises.push(updatePassword(password));
                }
            }

            if(email !== currentUser.email) {
                promises.push(updateEmail(email));
            }

            if(name !== currentUser.displayName) {
                promises.push(updateName(name));
            }

            const data = { name, email, bio, phone };

            promises.push(handleForm(data));

            setFormLoading(true);

            Promise.all(promises)
                    .then(() => {
                        history.push("/profile")
                    })
                    .catch(() => {
                        setError("Failed to update account")
                    })
                    .finally(() => {
                        setFormLoading(false)
                    });

        } catch (error) {
            setError(error.response.data.error);
            setFormLoading(false);
        }
        
    }

    // When user clicks on the button, open the input file tag
    const handleInput = () => {
        inputRef.current.click();
        setError("");
    }

    // Submit the file and clear data
    const handleChange = (e) => {
        var type = e.target.files[0].type;

        if(type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png") {
            setError("file must be either jpeg, jpg or png");
        } else {
            submitImage(e.target.files[0]);
        }
        e.target.value = "";
    }
    
    const updateUser = async () => {
        const { data } = await axios.get(`/api/profile/${currentUser.uid}`);
        setUser(data);
        setVariables(data);
    }

    useEffect(() => {
        async function getUser() {
            try {
                setLoading(true)
                const { data } = await axios.get(`/api/profile/${currentUser.uid}`);
                setUser(data);
                setVariables(data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setLoadError(true)
            }
        }

        getUser()
    }, [currentUser.uid]);


    return (
        <div className="profile-page">
            {
                loading ? <Loader /> :
                loadError ? <Error /> :
                <>
                    <ProfileNav />

                    <main className="prof">
        
                        <Link to="/profile">
                            <div className="back">
                                <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                <span>Back</span>
                            </div>
                        </Link>

                        <section className="profile_edit">
                            <h1>Change Info</h1>
                            <h3>Changes will be reflected to every services</h3>
                            <div className="profile_info">
                                <form onSubmit={(e) => e.preventDefault()} className="image">
                                    <div className="form_img">
                                        <div className="form_img_div">
                                            <img src={user.photo} alt={user.name} />
                                            <button ref={buttonRef} onClick={handleInput} ><i className="fa fa-camera" aria-hidden="true"></i></button>
                                            <input ref={inputRef} onChange={handleChange} type="file" name="image" />
                                        </div>
                                        <div className="img_text">
                                            <p>Change Photo</p>
                                        </div>
                                    </div>
                                </form>

                                <form onSubmit={(e) => submitForm(e)} className="form">
                                    {error && (<small>{error}</small>)}
                                    <div className="form_control">
                                        <label>Name</label>
                                        <input 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="text" name="name" placeholder="Enter your name..." />
                                    </div>

                                    <div className="form_control">
                                        <label>Bio</label>
                                        <textarea 
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            type="text" name="bio" placeholder="Enter your bio..."></textarea>
                                    </div>

                                    <div className="form_control">
                                        <label>Phone</label>
                                        <input 
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="text" name="phone" placeholder="Enter your phone number..." />
                                    </div>

                                    <div className="form_control">
                                        <label>Email</label>
                                        <input 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email" name="email" placeholder="Enter your email..." />
                                    </div>
                                    
                                    <div className="form_control">
                                        <label>Password</label>
                                        <input 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password" name="password" placeholder="Leave blank to keep the same" />
                                    </div>

                                    <div className="form_control">
                                        <label>Confirm Password</label>
                                        <input 
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                            type="password" name="password2" placeholder="Leave blank to keep the same" />
                                    </div>

                                    <button type="submit" 
                                        style={formLoading ? {pointerEvents: "none"} : null}>
                                        {formLoading ? <i className="fa fa-spinner" aria-hidden="true"></i> : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </section>
                    </main>
                </>
            }
        </div>
    )
}

export default EditProfile
