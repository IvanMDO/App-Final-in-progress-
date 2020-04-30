import React, { Component } from 'react';
import '../css/topNav.css';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../assets/icons/profile-icon.png';
import NYSLLogo from '../assets/nysl_logo.png';
import MenuIcon from '../assets/icons/menu-icon.png';
import GoogleIcon from '../assets/icons/google-icon.png';
import flecha from '../assets/icons/flecha.png';
import ContactPic from '../assets/icons/contact.png';
import InfoPic from '../assets/icons/info.png';
import DevelopersPic from '../assets/icons/datos.png';
import firebase from 'firebase';
import db from '../firebase/config';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      username: null
    };



  }



  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  openNav() {
    document.getElementById("sideNav").style.width = "50%";
    document.getElementById("sideNav").style.opacity = "100%";
    document.getElementById("sideNav").style.borderLeft = "1px limegreen solid";
    document.getElementById("opacityDiv").style.display = "block";
  }

  closeNav() {
    document.getElementById("sideNav").style.width = "0%";
    document.getElementById("sideNav").style.opacity = "0%";
    document.getElementById("sideNav").style.borderLeft = "0px limegreen solid";
    document.getElementById("opacityDiv").style.display = "none";
  }

  componentDidMount() {
    this.setState({ user: this.props.userData })
  }


  async handleLogin(e) {
    let provider = new firebase.auth.GoogleAuthProvider();
    let user;

    await firebase.auth().signInWithPopup(provider).then(function (result) {
      user = result.user
    })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });

    this.setState({ user: JSON.parse(JSON.stringify(user)) })

    this.props.onUserLogin(this.state.user);


    this.setCookie("token", this.state.user.stsTokenManager.accessToken, 365)

    // db.ref('user').push()
    db.ref('users/' + this.state.user.displayName).set(this.state.user, function (error) {
      if (error) {
        console.log("error al subir user")
        // The write failed...
      } else {
        // Data saved successfully!
      }
    });
  }

  handleLogOut(e) {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
    this.setState({ user: null })
    db.ref('users/' + this.state.user.displayName).remove()
    this.setCookie("token", null, 365);
  }



  render() {



    var button = this.state.user ?
      <li id="googleLi"><button id="logGoogle" onClick={this.handleLogOut.bind(this)}><img id="googleIcon" src={GoogleIcon} />Log out</button> </li>
      :
      <li id="googleLi"><button id="logGoogle" onClick={this.handleLogin.bind(this)}><img id="googleIcon" src={GoogleIcon} />Login</button></li>


    var profileImg = this.state.user ?
      <NavLink id="profilePic" to="/profile"><img className="userLogo" src={this.state.user.photoURL} alt="profile" /></NavLink>
      :
      <img className="userLogo" src={ProfileIcon} alt="default profile" />


    var profileName = this.state.user ?
      <p id="userName">{this.state.user.displayName}</p>
      :
      <p id="userName">Guest</p>


    return (

      <div id="topNavContainer" >
        <form >
          <input type="hidden" id="visited" value="" />
        </form>

        <div id="topNav">
          <ul>
            <li id="logoTtitle"><img src={NYSLLogo} alt="nysl logo" /><h2>NYSL</h2></li>
            <li id="menuButton"><img onClick={this.openNav} src={MenuIcon} alt="menu"></img></li>
          </ul>
        </div>

        <div onClick={this.closeNav} id="opacityDiv"></div>

        <div id="sideNav">
          <img id="flechita" onClick={this.closeNav} src={flecha} alt="closeNav" />
          <ul className="overflow-auto">
            <li id="userDiv">
              {profileImg}
              {profileName}
              <p id="userName">{this.state.userName}</p>
            </li>
            <li onClick={this.closeNav} className="links"><NavLink to="/About"><img className="icons" src={InfoPic} alt="infoIcon" />About</NavLink></li>
            <li onClick={this.closeNav} className="links"><NavLink to="/Contact"><img className="icons" src={ContactPic} alt="contactIcon" />Contact</NavLink></li>
            <li onClick={this.closeNav} className="links"><NavLink to="/Developers"><img className="icons" src={DevelopersPic} alt="developersicon" />Developers</NavLink></li>
            <li>{button}</li>
          </ul>

        </div>
      </div>
    )
  }
}

export default TopNav;
