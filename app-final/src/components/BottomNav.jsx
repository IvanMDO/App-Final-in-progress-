import React, { Component } from 'react';
import FootBallIcon from '../assets/icons/ball-icon.png';
import HomeIcon from '../assets/icons/home-icon.png';
import LocationsIcon from '../assets/icons/locations-icon.png';
import '../css/bottomNav.css'
import { NavLink } from 'react-router-dom';



class bottomNav extends Component {
    
    render() {
        
        return (
            <div id="bottomNav">
                <ul>
                    <li><NavLink  activeClassName="activeComponent" to="/home"><img src={HomeIcon} alt="home" /></NavLink></li>
                    <li><NavLink  activeClassName="activeComponent" to="/games"><img src={FootBallIcon} alt="games information" /></NavLink></li>
                    <li><NavLink  activeClassName="activeComponent" to="/locations"><img src={LocationsIcon} alt="locations" /></NavLink></li>
                </ul>
            </div>
        );
    }
}

export default bottomNav;
