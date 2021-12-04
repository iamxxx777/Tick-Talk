import ChatDay from "../Message/ChatDay"
import MessageForm from "../MessageForm/MessageForm"

import "./Chats.css"

const Chats = ({ toggle, messages, name, base, welcomeId }) => {

    const allDates = messages.map((message) => new Date(message.createdAt).toLocaleString('en-US', {month:"short",day:"numeric", year:"numeric"}))
    const uniqueDates = [...new Set(allDates)]


    return (
        <div className="chats">
            <div className="chats-container">
                <div className="chats-head">
                    <button onClick={toggle}><i className="fa fa-bars" aria-hidden="true"></i></button>
                    <h2>{name}</h2>
                </div>      
                <div className="chat-box">
                    <div className="chat-container">
                        {uniqueDates.map((date, i) => (
                            <ChatDay key={i} date={date} messages={messages} />
                        ))}
                        
                        <div ref={base}></div>
                    </div>
                </div>
                <MessageForm welcomeId={welcomeId} />
            </div>
        </div>
    )
}

export default Chats
