import React, { Component } from 'react';
import mapMarker from '../../assets/school-marker.png'
import '../../css/locations.css'

class Locations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locations : this.props.data
        }
    }

    showLocation(url) {

        document.getElementById("locationMap").style.display = "block";
        document.getElementById("locationMapOpacityDiv").style.display = "block";
        document.getElementById("locationMap").innerHTML = "<iframe src=" + url + "></iframe>";

    }

    hideLocation() {
        document.getElementById("locationMap").style.display = "none";
        document.getElementById("locationMapOpacityDiv").style.display = "none";
    }

    render() {
        let locations = this.state.locations;
        locations.sort((a, b) => a.name - b.name ? 1 : -1);

        const locationsList = locations.map((location, index) => {
            return(
                <div key={index} className="card mb-3 location">
                    <div className="card-header locationTitle">{location.name}</div>

                    <div className="card-body text-primary locationImage" >
                        <img onClick={() => this.showLocation(location.googleURL)} className="w-100 h-100"  src={location.imageURL} alt="school location"/>
                        <img className="marker" src={mapMarker} alt="map marker"/>
                    </div>

                    <div className="card-footer locationDirection">{location.adress}</div>
                </div>
            )
        })

        return(
            <div id="locationsContainer">
                <h1 className="mainTitle">Locations</h1>
                <div id="locationsGrid">
                    {locationsList}
                </div>
                
                
                <div onClick={this.hideLocation} id="locationMapOpacityDiv"></div>
                <div id="locationMap"></div>
            </div>
            
        )
    }
}

export default Locations