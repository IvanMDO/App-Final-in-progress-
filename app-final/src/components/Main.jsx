import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './currents/Home';
import Games from './currents/Games';
import Locations from './currents/Locations';
import Comments from './currents/Comments';
import About from './currents/About';
import Contact from './currents/Contact';
import Developers from './currents/Developers';
import Loading from '../assets/logo.gif';

import  db  from '../firebase/config';
import '../css/Main.css';


class Main extends Component {
  constructor(props){
    super(props)
    this.state={
        games:[],
        events: [],
        locations: [],
        flag:false,
        user:null,
        users:null
    }   
}

getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  
  componentWillMount(){  
    db.ref().on('value', snap => {
      let auxGames = Object.values(snap.val().games);
      let auxEvents = Object.values(snap.val().events);
      let auxLocations = Object.values(snap.val().locations);
      

      let token = this.getCookie("token")

      

      this.setState({games:auxGames, events:auxEvents, locations:auxLocations, users:snap.val().users })
    

    if(token && this.state.users){
      let users = this.state.users
      users = Object.values(users);

      users.forEach(user=>{
        if(user.stsTokenManager.accessToken == token)
        {
          this.props.onTakeToken(user)
        }
      })
    }


      this.setState({flag:true})

      
    });

    
      
  }
  componentDidUpdate(){
   if(this.state.user != this.props.userData)
   {
    this.setState({user:this.props.userData})
   }
  }

   render(){
    //  console.log(this.state.user)
    return this.state.flag ?
    (
      <div id="mainContainer">
        <Switch>
          <Route path="/match">
           
            <Comments />
          </Route>
          <Route path="/games">
            <Games data={this.state.games} userData={this.state.user} />
          </Route>

          <Route path="/locations">
            <Locations data={this.state.locations} />
          </Route>

          <Route path="/About">
            <About />
          </Route>  

          <Route path="/Contact">
            <Contact />
          </Route>

          <Route path="/Developers">
            <Developers />
          </Route>

          <Route path="/">
            <Home data={this.state.events}/>
          </Route>          
        </Switch>
      </div>
    ) 
    : 
    <div id="loadingContainer">
      <img id="loadingPic" src={Loading} alt="loading"/>
      <h1 id="loadingText">Loading...</h1>
    </div>
    
   }
}
 
export default Main;


