import React, { Component } from 'react';

import CalendarIcon from '../../assets/icons/calendar-icon.png';
import CaretIcon from '../../assets/icons/caret-icon.png';
import ClockIcon from '../../assets/icons/clock-icon.png';
import MapIcon from '../../assets/icons/map-icon.png';
import CommentsIcon from '../../assets/icons/comments-icon.png'
import '../../css/games.css';
import db from '../../firebase/config';



class Games extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: this.props.data,
            activeData: null,
            flag: false,
            currentGame: null,
            msg: '',
            date: {
                day: '',
                month: '',
                hour: ''
            },
            user: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        db.ref().on('value', snap => {


            this.setState({ activeData: snap.val().games, flag: true })
            // this.setState({ user: snap.val().users }) //hacer que games reciba userData
        })


    }

    showLocation(url) {

        document.getElementById("map").style.display = "block";
        document.getElementById("mapOpacityDiv").style.display = "block";
        document.getElementById("map").innerHTML = "<iframe src=" + url + "></iframe>";

    }


    hideLocation() {
        document.getElementById("map").style.display = "none";
        document.getElementById("mapOpacityDiv").style.display = "none";
        document.getElementById("commentsDiv").style.display = "none";
    }

    showComments(index) {
       
        document.getElementById("messages").innerHTML = ""
        document.getElementById("commentsDiv").style.display = "block"
        document.getElementById("mapOpacityDiv").style.display = "block";
        // document.getElementById("commentsDiv").innerHTML =

        document.getElementById("commentsContainer").style.display = "block";
        var objDiv = document.getElementById("commentsDiv");
        objDiv.scrollTop = objDiv.scrollHeight
        let games = Object.values(this.state.activeData)

        this.setState({ currentGame: index })

        if (games[index].comments != null) {
            let comments = Object.values(games[index].comments)
            // comments = comments.reverse()
          


        
           

            comments.forEach(comment => {
               console.log(comment)
                if (comment.content != "") {
                    document.getElementById("messages").innerHTML +=
                        `
        <li><section><div id="msgName">` + comment.user +`</div><p id="msgContent">` 
        +
        comment.content
        +
        `
       </p> <div id="msgTime">` + comment.date.month + `/` + comment.date.day +`    ` + comment.date.time +`</div></section></li>
        `
                }
            })
        }

    }

    handleSubmit(e) {

        e.preventDefault();
        let userName = this.state.user.displayName
        let msg = this.state.msg
        let msgDay = this.state.date.day
        let msgMonth = this.state.date.month
        let msgHour = this.state.date.hour

        let newMsg = {
            user: userName,
            content: msg,
            date: {
                day: msgDay,
                month: msgMonth,
                time: msgHour
            }
        }

        let index = this.state.currentGame
        console.log(index)
        let msgId = db.ref("games/game" + index + "/comments").push(newMsg).key;

        document.getElementById("messages").innerHTML +=

        `<li><section><div id="msgName">` + userName + `</div><p id="msgContent">` + msg + `  </p> <div id="msgTime">` + msgMonth + `/` + msgDay + `   `+ msgHour +`</div></section></li>`
        this.setState({ msg: '' })

        document.getElementById("commentsDiv").scrollTop = document.getElementById("commentsDiv").scrollHeight;
    }


    componentDidUpdate(){
        if(this.state.user!=this.props.userData)
        {
            this.setState({ user: this.props.userData})
        }
    }
    handleChange(event) {

        let day = new Date()
        let month = new Date()
        let hour = new Date()
        let minutes = new Date()

        this.setState({
            msg: event.target.value,
            date:{
                day: day.getDate(),
                month: month.getMonth() + 1,
                hour: hour.getHours() + ':' + minutes.getMinutes()
            }
        });
    }



    render() {
        let games = this.state.games;
        games.sort((a, b) => a.date.month == b.date.month ? a.date.day - b.date.day : a.date.month - b.date.month
        );
        



        const gamesList = games.map((game, index) => {
            const commentLogIn = this.state.user != null ? (
                <div id="comments" onClick={() => this.showComments(index)}>
                    <img alt="comments icon" src={CommentsIcon} />Comments
                </div>
            )
            :
            (
                <div id="notComments">Login to see and post comments!</div>
            )




            return this.state.flag ? (

                <div id="accordion" key={index}>
                    <form name="refreshForm">
                        <input type="hidden" name="visited" value="" />
                    </form>
                    <div id="game" className="card container mb-3 w-75">
                        <img id="caret" src={CaretIcon} alt="more info" />
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target={'#collapse' + index} aria-expanded="false" aria-controls={'collapse' + index} >
                                    <div id="gameContainer">
                                        <div id="date">
                                            <img alt="calendar icon" src={CalendarIcon} />{game.date.month}/{game.date.day}
                                        </div>
                                        <div id="teams">
                                            <div id="team1">{game.localTeam.name}</div>vs<div id="team2">{game.visitorTeam.name}</div>
                                        </div>
                                    </div>
                                </button>
                            </h5>
                        </div>

                        <div id={'collapse' + index} className="collapse hide" aria-labelledby={'heading' + index} data-parent="#accordion">
                            <div className="card-body">
                                <div id="hour">
                                    <img alt="clock icon" src={ClockIcon} />{game.date.time}
                                </div>
                                <div id="location" onClick={() => this.showLocation(game.location.googleURL)}>
                                    <img alt="clock icon" src={MapIcon} /><p>{game.location.place}</p>
                                </div>

                                {commentLogIn}

                            </div>
                        </div>
                    </div>
                </div>

            ) : <h1 key={index}>Loading...</h1>

        })



        return (
            <div id="gamesContainer">
                <h1 className="mainTitle">Games List</h1>
                {gamesList}

                <div onClick={this.hideLocation} id="mapOpacityDiv"></div>

                <div id="map"></div> />

                <div id="commentsDiv">
                    <div id="commentsContainer">
                        <div id="chat">
                            <ul id='messages' ></ul>
                        </div>
                    </div>
                    <form id="submitComment" onSubmit={this.handleSubmit}>
                        <input type="text" id="input" autoComplete="off" value={this.state.msg} onChange={this.handleChange} />
                        <button type="submit" id="send">SEND</button>
                    </form>
                </div>




            </div>


        );
    }

}

export default Games;

