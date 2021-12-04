import ChannelItem from './ChannelItem'

import "./allChannels.css"

const AllChannels = ({ click, close, showModal, channels }) => {

    return (
        <div className="all-channels">
            <div className="channels-head">
                <h2>Channels</h2>
                <div className="channels-head-buttons">
                    <button onClick={showModal}><i className="fa fa-plus" aria-hidden="true"></i></button>
                    <button className="side-close" onClick={close}>x</button>
                </div>
            </div>
            <div className="channels">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" name="search" placeholder="search..." required />
                    <button><i className="fa fa-search" aria-hidden="true"></i></button>
                </form>
                <div className="channels-list">
                    {channels.map((channel, i) => <ChannelItem key={i} channel={channel} />)}
                </div>
            </div>
        </div>
    )
}

export default AllChannels