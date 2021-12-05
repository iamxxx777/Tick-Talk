import { useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../contexts/authContext"

import "./MessageForm.css"

const MessageForm = ({ welcomeId }) => {

    const { id } = useParams()
    const { socket, currentUser } = useAuth()

    const [msg, setMsg] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    const sendMessage = async (e) => {
        e.preventDefault()
        socket.connect()
        try {
            setLoading(true)
            const message = { uid: currentUser.uid, currentChannel: welcomeId ? welcomeId : id, msg }
            const { data } = await axios.post("/api/messages", message)
            socket.emit("message", {channel: data.message.channel, message: data.message})

            if(data.user) socket.emit("new user", {channel: data.message.channel, user: data.user})

            setMsg("")
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError("Error sending msg")
        }
    }

    return (
        <div className="message-form">
            <form className="new-message" onSubmit={sendMessage} onChange={() => setError("")}>
                {error && <small>{error}</small>}
                <textarea 
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Type a message here" 
                    maxLength={250}
                ></textarea>
                <button type="submit">
                    {loading ? 
                        <i className="fa fa-spinner spin" aria-hidden="true"></i> : 
                        <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    }
                </button>
            </form>
        </div>
    )
}

export default MessageForm
