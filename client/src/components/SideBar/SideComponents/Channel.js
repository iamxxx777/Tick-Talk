import Member from "./Member"

import "./channel.css"

const Channel = ({ click, close, members, channel }) => {
    return (
        <div className="channel">
            <div className="channel-head">
                <div className="channel-head-main">
                    <button onClick={click}><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
                    <h2>All channels</h2>
                </div>
                <button className="side-close" onClick={close}>x</button>
            </div>
            <div className="channel-info">
                <div className="channel-about">
                    <h1>{channel.name}</h1>
                    <p>{channel.description}</p>
                </div>
                <div className="channel-members">
                    <h2>Members</h2>
                    <div className="members">
                        {members.map((member, i) => <Member key={i} data={member} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Channel
