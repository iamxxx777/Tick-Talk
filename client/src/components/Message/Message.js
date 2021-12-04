import "./Message.css"

const Message = ({ message }) => {

    const setTime = () => {
        const today = new Date()
        const todayString = today.toLocaleString('en-US', {month:"short",day:"numeric", year:"numeric"})
        const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toLocaleString('en-US', {month:"short",day:"numeric", year:"numeric"})
        const msgDate = new Date(message.createdAt).toLocaleString('en-US', {month:"short",day:"numeric", year:"numeric"})
        const msgTime = new Date(message.createdAt).toLocaleString('en-US', {hour:'numeric', minute:'numeric'})

        var str = "";
        if(todayString === msgDate) {
           str = "today at " + msgTime
        } else if (yesterday === msgDate) {
           str = "yesterday at " + msgTime
        } else {
            str = new Date(message.createdAt).toLocaleString('en-US', {month:"short",day:"numeric"}) + " at " + msgTime
        }

        return str;

    }
    

    return (
        <div className="chat-message">
            <div className="chat-img">
                <img src={message.sender.photo} alt={message.sender.name} />
            </div>
            <div className="chat-info">
                <div className="chat-head">
                    <h3>{message.sender.name}</h3>
                    <h4>{setTime()}</h4>
                </div>
                <div className="chat-body">
                    <p>{message.text}</p>
                </div>
            </div>
        </div>
    )
}

export default Message
