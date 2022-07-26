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

        return new File([data], "userPhoto.jpg", {type: "image/jpeg"})
    }

    useEffect(() => {
        if(!user) {
            navigate('/');
            return;
        }

        console.log("inside use effect")
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            console.log("formdata : ", formdata)

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post("https://api.chatengine.io/users/", 
                    formdata,
                    { headers : {
                        "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY
                    }})
                    .then(() => setLoading(false))
                    .catch((error) => console.log("error"))
                })
        })
    }, []);

    // if(!user || loading) return "Loading..."

  return (
    <div className='chats-page'>
        <div className="nav-bar">
            <div className="logo-tab">React Chat App</div>
            <div className="logout-tab"
            onClick={handleLogout}>Logout</div>
        </div>

        <ChatEngine
        height='100vh'
        userName={user.email}
        userSecret={user.email}
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        />
    </div>
  )
}

export default Chats