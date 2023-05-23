import React, { Component } from "react";
import { Navigate } from 'react-router-dom';

class NavBar extends Component {

    render() {
    return (
        <div class="card">
            <div class="body">
                <ul>
                    <li>
                        <div class="submit">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <button class='submitButton' onClick={() => { window.location.href = 'Chess'; }}><i class="fas fa-chess-king icon"></i>Play</button>
                        </div>
                    </li>
                    <li><button class='navButton' onClick={() => { window.location.href = 'Home'; }}><i class="fas fa-home icon"></i> Home</button></li>
                    <li><button class='navButton' onClick={() => { window.location.href = 'Profile'; }}><i class="fas fa-user-alt icon"></i> Profile</button></li>
                    <li><button class='navButton' onClick={() => { window.location.href = ''; }}><i class="fas fa-user-alt icon"></i> Log out</button></li>
                </ul>
            </div>
        </div>
        );
    }
}

export default NavBar;