import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import {ChatEngine} from 'react-chat-engine'
import { auth } from '../../Firebase';
import { useAuth } from '../../Contexts/AuthContext';
import axios from 'axios';

function Chats() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useAuth();

    console.log("user", user)
    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data, "userPhoto.jpg", {type: "image.jpeg"}])
    }

    useEffect(() => {
        if(!user) {
            navigate('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "a0591c67-2f1d-4a26-b042-a83dc6f66a5e",
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formData = new FormData();
            formData.append('email', user.email);
            formData.append('username', user.email);
            formData.append('secret', user.uid);
            getFile(user.photoUrl)
            .then((avatar) => {
                formData.append('avatar', avatar, avatar.name)

                axios.post("https://api.chatengine.io/users", 
                formData,
                { headers : {
                    "private-key": "effc7ff9-3e65-4dc4-b238-1405c70353b4"
                }}
                )
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user, navigate]);

  return (
    <div className='chats-page'>
        <div className="nav-bar">
            <div className="logo-tab">React Chat App</div>
            <div className="logout-tab"
            onClick={handleLogout}>Logout</div>
        </div>

        <ChatEngine
        height="calc(100vh - 66px"
        projectId = "a0591c67-2f1d-4a26-b042-a83dc6f66a5e"
        userName= {user.email}
        userSecret= {user.uid}
        />
    </div>
  )
}

export default Chats