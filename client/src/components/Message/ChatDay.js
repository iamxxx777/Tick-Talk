import GroupHeader from "./GroupHeader"
import Message from "./Message"

import "./Message.css"

const ChatDay = ({ date, messages }) => {

    const chatMessages = messages.filter((message) => new Date(message.createdAt).toLocaleString('en-US', {month:"short",day:"numeric", year:"numeric"}) === date)

    return (
        <div className="chat-day">
            <GroupHeader date={date} />
            {chatMessages.map((message) => (
                <Message key={message._id} message={message} />
            ))}
        </div>
    )
}

export default ChatDay
