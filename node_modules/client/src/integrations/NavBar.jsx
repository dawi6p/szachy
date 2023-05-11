import React, { Component } from "react";

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
                        <button class='submitButton'><i class="fas fa-chess-king icon"></i>Play</button>
                    </div>
                </li>
                <li><button class='navButton'><i class="fas fa-home icon"></i> Home</button></li>
                <li><button class='navButton'><i class="fas fa-user-alt icon"></i> Profile</button></li>
            </ul>
        </div>
    </div>
    );
  }
}

export default NavBar;