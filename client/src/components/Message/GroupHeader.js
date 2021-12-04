import "./Message.css"

const GroupHeader = ({ date }) => {

    return (
        <div className="group-head">
            <div className="line"></div>
            <div className="group-day">{date}</div>
            <div className="line"></div>
        </div>
    )
}

export default GroupHeader
