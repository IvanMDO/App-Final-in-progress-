import React, { Component } from 'react';
import '../../css/home.css';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            events: this.props.data
        }
    }

    render() { 
        const allEvents = [...this.state.events];
        const firstEvent = [];
        firstEvent.push(allEvents[0]);
        allEvents.splice(0, 1)
        console.log(firstEvent)

        const firstItem = firstEvent.map((event, index) => {
            return (
                <div key={index} className="carousel-item active text-center">
                    <div className="d-block w-100">
                        <p className="eventTitle">{event.name}</p>
                        <p className="eventDescription">{event.description}</p>
                    </div>
                    
                    <div className="carousel-caption d-none d-md-block">
                        <p className="eventDate">{event.day}</p>
                        <p className="eventDate">{event.time}</p>
                    </div>
                </div>
            )
        })

        const eventList = allEvents.map((event, index) => {
            return (
                <div key={index} className="carousel-item text-center">
                    <div  className="w-100 ">
                        <p className="eventTitle">{event.name}</p>
                        <p className="eventDescription">{event.description}</p>

                        <div id="eventDates" className="d-flex align-items-center flex-column mt-10">
                            <p className="eventDate">{event.date.day}</p>
                            <p className="eventDate">{event.date.time}</p>
                        </div>
                    </div>
                </div>
            )
        })

        const eventInstance = allEvents.map((event, index) => {
            return (
                <li key={index} data-target="#eventCarousel" data-slide-to={index + 1}></li>
            )
        })

        
        return ( 
            <div id="eventCarousel" className="carousel slide container d-flex align-items-center" data-ride="carousel">
                <ol className="carousel-indicators m-0">
                    <li data-target="#eventCarousel" data-slide-to="0" className="active"></li>
                    {eventInstance}
                </ol>

                <div className="carousel-inner">
                    {firstItem}
                    {eventList}
                </div>
            </div>
        );
    }
}
 
export default Home;