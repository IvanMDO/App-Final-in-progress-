import React,{ Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import BottomNav from './components/BottomNav.jsx';
import Main from './components/Main.jsx';
import TopNav from './components/TopNav.jsx';
import './css/App.css';

class App extends Component {
  constructor(){
    super()
    this.state = { 
      user: null
     }

  }

  handleUser = (userData) =>{
      console.log(userData)
      this.setState({user: userData})
      console.log(this.state.user)
  }
  
  handleToken = (user) =>{
    this.setState({user:user})
  }


  render() {
    
    return ( 
      <div id="container">
        <Router>
          <TopNav onUserLogin={this.handleUser} userData={this.state.user}/>
          <Main onTakeToken={this.handleToken} userData={this.state.user}/>
          <BottomNav />   
        </Router>  
      </div>
     );
  }
}


export default App;

