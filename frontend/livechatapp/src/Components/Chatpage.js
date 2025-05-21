import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';

import './Chatpage.css';

function Chatpage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userList, setUserList] = useState([]);
    const [typingUser, setTypingUser] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const socketRef = useRef(null);
    const typingTimeout = useRef(null);

    const storedName = sessionStorage.getItem('username') || localStorage.getItem('username');
    sessionStorage.setItem('username', storedName);
    const username = storedName;

    useEffect(() => {
        socketRef.current = io('http://localhost:8000');
        socketRef.current.emit('new-user', username);

        socketRef.current.on('chat-message', (data) => {
            setMessages(prev => [...prev, data]);
        });

        socketRef.current.on('user-list', (users) => {
            setUserList(users);
        });

        socketRef.current.on('user-joined', (newUser) => {
            if (newUser !== username) {
                setNotifications(prev => [...prev, `${newUser} is Online`]);
                toast(`${newUser} is Online`);
            }
        });

        socketRef.current.on('user-left', (leftUser) => {
            if (leftUser !== username) {
                setNotifications(prev => [...prev, `${leftUser} is Offline`]);
                toast(`${leftUser} is Offline`);
            }
        });

        // When someone starts typing
        socketRef.current.on('user-typing', (user) => {
            if (user !== username) {
                setTypingUser((prev) => [...new Set([...prev, user])]);
            }
        });

        // When someone stops typing
        socketRef.current.on('user-stop-typing', (user) => {
            setTypingUser((prev) => prev.filter((u) => u !== user));
        });
        return () => {
            socketRef.current.disconnect();
        };
    }, [username]);

    const handleSend = () => {
        if (message.trim()) {
            socketRef.current.emit('send-chat-message', {
                sender: username,
                message,
            });
            toast.success('Message sent');
            setMessage('');
            socketRef.current.emit('stop-typing', username);
        }
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);
        socketRef.current.emit('typing', username);

        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            socketRef.current.emit('stop-typing', username);
        }, 1500);
    };

    return (
        <>
            <div className="chat-container">
                <div className="user-list">
                    <h3>Online Users</h3>
                    <ul>
                        {userList.map((user, idx) => (
                            <li key={idx}>
                                {user}
                                {typingUser.includes(user) && <span style={{ color: 'green', marginLeft: '8px' }}>typing...</span>}
                            </li>
                        ))}

                    </ul>
                </div>

                <div className="chat-window">
                    <div className="chat-messages">
                        {notifications.map((note, idx) => (
                            <div key={`note-${idx}`} className="notification">{note}</div>
                        ))}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`chat-bubble ${msg.sender === username ? 'right' : 'left'}`}
                            >
                                <strong>{msg.sender}</strong>: {msg.message}
                            </div>
                        ))}

                       
                    </div>

                    <div className="chat-input">
                        <input
                            type="text"
                            placeholder="Type message..."
                            value={message}
                            onChange={handleTyping}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Chatpage;
