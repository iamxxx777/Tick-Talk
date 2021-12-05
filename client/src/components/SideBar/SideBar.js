import { useState } from 'react'

// Components
import User from "./User"
import AllChannels from './SideComponents/AllChannels'
import Channel from './SideComponents/Channel'

import "./SideBar.css"

const SideBar = ({ toggle, close, channels, members, channel, showModal }) => {

    const [view, setView] = useState(true);

    return (
        <div className={`sidebar ${toggle && "show-sidebar"}`}>
            <div className="side-container">
                {!view && <AllChannels channels={channels} close={close} click={() => setView(view)} showModal={showModal} />}
                {view && <Channel members={members} channel={channel} close={close} click={() => setView(!view)} />}
            </div>
            <User />
        </div>
    )
}

export default SideBar
