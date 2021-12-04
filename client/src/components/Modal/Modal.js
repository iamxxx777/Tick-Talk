import { useState } from 'react'
import axios from "axios"
import { useAuth } from "../../contexts/authContext"

import "./Modal.css"

const Modal = ({click}) => {

    const { currentUser, socket } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const details = {
                name: e.target.name.value,
                description: e.target.description.value,
                uid: currentUser.uid
            }

            setLoading(true);

            const { data } = await axios.post("/api/channels", details);
            socket.emit("created channel", data);

            setLoading(false);
            click();
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError("Error creating channel, please try again");
        }
        
    }


    return (
        <div className="modal">
            <div className="modal-container">
                <h2>New Channel</h2>
                <form onChange={() => setError("")} onSubmit={createChannel}>
                    {error && <small>{error}</small>}
                    <div className="modal-group">
                        <input type="text" name="name" placeholder="Channel name" />
                    </div>
                    <div className="modal-group">
                        <textarea name="description" placeholder="Channel description"></textarea>
                    </div>
                    <div className="modal-buttons">
                        <button 
                            onClick={click}
                            style={loading ? {pointerEvents: "none", backgroundColor: "gray"} : null}
                            className="modal-cancel">Cancel</button>
                        <button 
                            style={loading ? {pointerEvents: "none", backgroundColor: "gray"} : null}
                            className="modal-submit" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal
