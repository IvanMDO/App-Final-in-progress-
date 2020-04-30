import React, { Component } from 'react';
import emailPng from '../../assets/icons/emailPng.png'
import wsp from '../../assets/icons/wsp.png'
import fb from '../../assets/icons/fb.png'
import tw from '../../assets/icons/tw.png'
import '../../css/contact.css';

class Contact extends Component {
    render() {
      return (
            <div id="contact">
                <h1><u>Contact</u></h1>
                <div className="contactDiv">
                    <a href="mailto:nysl@chisoccer.org"><img className="icons" src={emailPng} alt="emailIcon"/></a>
                    <p>Please emails us at <a href="mailto:nysl@chisoccer.org">nysl@chisoccer.org</a></p>
                    <p>We will reply to your email as soon as we can.</p>
                </div>
                <div className="contactDiv">
                    <a href="https://api.whatsapp.com/send?phone=5401137935275&text=Hi,%20i%20have%20a%20doubt."><img className="icons" src={wsp} alt="whatsAppIcon"/></a>
                    <p>Please contact us if you have any questions.</p>
                </div>
                <div className="contactDiv">
                    <a href="https://www.facebook.com/"><img className="icons" src={fb} alt="facebookIcon"/></a>
                    <a href="https://twitter.com/"><img className="icons" src={tw} alt="twitterIcon"/></a>
                    <p>Visit our social networks, Facebook and Twitter!</p>
                </div>
            </div>
        );
    }
}
    
  export default Contact;