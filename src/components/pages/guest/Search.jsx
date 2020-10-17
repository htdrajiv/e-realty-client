import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            currentPosition: {
                latitude: 0.0, longitude: 0.0
            }
        });
        this.setCurrentLocation.bind(this);
        this.watchUserMovement.bind(this);
    }

    componentDidMount() {
        this.setCurrentLocation();
        this.watchUserMovement();
    }

    setCurrentLocation() {
        let _this = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                _this.setState({
                    currentPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
    }

    watchUserMovement() {
        let _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function (position) {
                _this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            });
        }
    }

    render() {
        let { currentPosition } = this.state;
        return (
            <div>
                Your current location is: {" Latitude = " + currentPosition.latitude + ", Longitude is :" + currentPosition.longitude}
            </div>
        )
    }
}

export default Search;