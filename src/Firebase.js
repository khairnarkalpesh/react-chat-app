//to use firebase app
import firebase from 'firebase/compat/app';

//to use auth
import 'firebase/compat/auth';

export const auth = firebase.initializeApp ({
  apiKey: "AIzaSyDOkX0l39Zuba2Yh66sGi1ltl3ovTyKUSs",
  authDomain: "react-chat-app-82195.firebaseapp.com",
  projectId: "react-chat-app-82195",
  storageBucket: "react-chat-app-82195.appspot.com",
  messagingSenderId: "968338153538",
  appId: "1:968338153538:web:22e1afca33d3dfb1184ddb"
}).auth();