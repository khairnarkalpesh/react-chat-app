import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/Login/Login'
import Chats from './components/Chats/Chats'
import './App.css'
import { AuthProvider } from './Contexts/AuthContext'

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/chats" element={<Chats />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App