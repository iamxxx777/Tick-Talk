import { Link } from 'react-router-dom'

const ChannelItem = ({ channel, click }) => {

    const logo = (word) => {
        let words = word.split(" ");
        let initials;
        if (words.length >= 2) {
            initials = [words[0].substring(0,1), words[1].substring(0,1)].join("");    
        } else {
            initials = words[0].substring(0,1);
        }
        return initials;
    }

    return (
        <button onClick={click} >
           <Link to={channel._id === process.env.REACT_APP_WELCOME_ID ? "/" : `/channels/${channel._id}`} className="channel-item">
               <div>{logo(channel.name)}</div>
               <h3>{channel.name}</h3>
           </Link>  
        </button>
        
    )
}

export default ChannelItem
