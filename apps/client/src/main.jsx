import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Chess from './Chess.jsx'
import Home from './Home.jsx'
import Rejestracja from './rejestracja.jsx'
import UsersList2 from './UsersList2.jsx'
import User from './User.jsx'
import Profile from './Profile.jsx'
import MyHome from './MyHome.jsx';
import ChangeProfile from "./ChangeProfile.jsx"
import EndGame from './endGame.jsx';
import EditMessage from './editMessage.jsx';
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MyHome />} />
        <Route path="/Login" element={<Home />} />
        <Route path="/MyHome" element={<MyHome />} />
        <Route path="/Chess" element={<Chess />} />
        <Route path="/EndGame" element={<EndGame />} />
        <Route path="/rejestracja" element={<Rejestracja />} />
        <Route path="/profile/Edit" element={<ChangeProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin">
            <Route path="/admin/listaUsers" element={<UsersList2 />} />
            <Route path="/admin/user" element={<User />} />
            <Route path="/admin/editMessage" element={<EditMessage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
