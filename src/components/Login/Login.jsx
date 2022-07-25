import React from 'react'
import { GoogleOutlined, FacebookOutlined} from '@ant-design/icons'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {auth} from '../../Firebase'
import './login.css'

function Login() {
  return (
    <div id='login-page'>
        <div id="login-card">
            <h2>React Chat App</h2>

            <div className="login-button google"
            onClick={() => {auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}}>
                <GoogleOutlined/>Sign In With Google
            </div>

            <br/>
            <br/>

            <div className="login-button facebook">
                <FacebookOutlined/>Sign In With Google
            </div>
        </div>
    </div>
  )
}

export default Login