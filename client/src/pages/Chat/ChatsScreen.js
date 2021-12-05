import { useEffect, useState, useRef, useCallback } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../contexts/authContext"

import SideBar from '../../components/SideBar/SideBar'
import Chats from '../../components/Chats/Chats'
import Modal from '../../components/Modal/Modal'
import Loader from "../../components/Loader/Loader"
import Error from "../../components/Error/Error"

import "./ChatsScreen.css"

const ChatScreen = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const baseRef = useRef(null);

    const { id } = useParams();
    const { socket } = useAuth();
    const [channel, setChannel] = useState({});
    const [channels, setChannels] = useState([]);
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [modal, setModal] = useState(false);

    const fetchChannels = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("/api/channels");
            setChannels(data);
        } catch (error) {
            setError(true)
        }
        
    }

    const fetchChannel = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/channels/${id}`)
            setChannel(data)
            setMessages(data.messages)
            setMembers(data.members)
            setLoading(false)
        } catch (error) {
            setError(true)
        }
    }, [id]);

    useEffect(() => {
        socket.on('created channel', (channel) => {
            setChannels([...channels, channel]);
        });
    }, [channels, socket]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        setTimeout(() => {
            baseRef.current && baseRef.current.scrollIntoView({behaviour: "smooth"});
        }, 100);

        return () => {};
    }, [messages, socket]);

    useEffect(() => {
        socket.on('new user', (user) => {
            setMembers([...members, user])
        })
    }, [members, socket])

    useEffect(() => {
        socket.connect();
        socket.emit('join channel', id);
        return () => {
            socket.emit('leave channel', id);
        };
    }, [id, socket]);


    useEffect(() => {
        fetchChannels()
        fetchChannel()
    }, [fetchChannel]);


    const showModal = () => {
        setModal(true);
    }

    return (
        <div className="chat-screen">
            {loading ? <Loader /> : 
                error ? <Error /> :
                <>
                    <div className="chat">
                        <SideBar channels={channels} channel={channel} members={members} close={() => setShow(false)} toggle={show} showModal={showModal} />
                        <Chats messages={messages} name={channel?.name} base={baseRef} toggle={() => setShow(true)} />
                    </div>
                    {modal && <Modal click={() => setModal(false)} />}
                </>
            }
        </div>
    )
}

export default ChatScreen
