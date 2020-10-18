import React from 'react';
import ReactMapGL, { FullscreenControl, GeolocateControl, Marker, NavigationControl, ScaleControl, Layer, LinearInterpolator, FlyToInterpolator } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import { token, styles } from "./config"
import ImageLoader from "../ImageLoader";
import $ from 'jquery'

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

const mapTypes = {
    satellite: "satellite",
    light: "light",
    basic: "basic"
}

const geolocateStyle = {
    position: 'absolute',
    top: 50,
    right: 10,
    padding: '5px'
};

const fullscreenControlStyle = {
    position: 'absolute',
    top: 5,
    left: 0,
    padding: '10px'
};

const navStyle = {
    position: 'absolute',
    top: 72,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    position: 'absolute',
    bottom: 36,
    left: 0,
    padding: '10px'
};

const customButtonsStyle = {
    position: 'absolute',
    top: 100,
    right: 5,
    padding: '5px'
}


class MyMapBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {},
            userLocation: {},
            searchResultLayer: {},
            geocoderSearchCoordinates: {},
            mapStyle: styles.basic,
            searchLocation: "",
            autoGeolocateControl: false
        }
        this.onViewportChange = this.onViewportChange.bind(this);
    }

    componentDidMount() {
        this.setUserLocation.bind(this);
        this.getDefaultViewPort();
    }

    mapRef = React.createRef();

    onViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        });
    };

    setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let userLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            };
            let userViewport = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 10
            };
            this.setState({
                viewport: userViewport,
                userLocation: userLocation
            });
        });
    };

    onGeocoderResult(result) {
        this.setState({
            geocoderSearchCoordinates: { lat: result.result.geometry.coordinates[1], long: result.result.geometry.coordinates[0] }
        })
    }

    getGeocoderSearchMarker() {
        const { geocoderSearchCoordinates } = this.state;
        let marker = (
            <div />
        )
        if ((typeof geocoderSearchCoordinates.lat !== 'undefined' && geocoderSearchCoordinates.lat !== null)
            && (typeof geocoderSearchCoordinates.long !== 'undefined' && geocoderSearchCoordinates.long !== null)
        ) {
            marker = (<Marker
                latitude={geocoderSearchCoordinates.lat}
                longitude={geocoderSearchCoordinates.long}
            >
                <ImageLoader name={'searched-location-marker.png'} alt={'img'} />
            </Marker>)
        }
        return marker;
    }

    onMapTypeChange(key) {
        this.setState({
            mapStyle: styles[key]
        })
    }

    getDefaultViewPort() {
        let viewport = {};
        let queryParams = new URLSearchParams(this.props.location.search);
        let searchText = queryParams.get("searchLocation");
        if (typeof searchText !== 'undefined' && searchText !== null) {
            $.ajax({
                url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + searchText + ".json?access_token=" + token,
                cache: false,
                success: function (data) {
                    let features = data.features[0];
                    if (typeof features !== 'undefined') {
                        viewport = {
                            longitude: features["center"][0],
                            latitude: features["center"][1],
                            zoom: 15,
                            transitionDuration: 2000,
                            transitionInterpolator: new FlyToInterpolator(),
                        };
                        this.setState({
                            viewport: viewport,
                            searchLocation: features["place_name"]
                        })
                    } else {
                        toast.error("Not a valid address");
                        this.setState({
                            autoGeolocateControl: true
                        })

                    }
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        } else {
            this.setState({
                autoGeolocateControl: true
            })
        }
        return viewport;

    }

    render() {
        const { viewport, mapStyle, searchLocation, autoGeolocateControl } = this.state;
        let satelliteActive = mapStyle === styles[mapTypes.satellite] ? `active` : '';
        let basicActive = mapStyle === styles[mapTypes.basic] ? `active` : '';
        let lightActive = mapStyle === styles[mapTypes.light] ? `active` : '';
        let GeocoderSearchMarker = this.getGeocoderSearchMarker();
        return (
            <div style={{ height: this.props.height, width: this.props.width }}>
                <ReactMapGL
                    ref={this.mapRef}
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapStyle={mapStyle}
                    mapboxApiAccessToken={token}
                    onViewportChange={this.onViewportChange}
                >
                    <GeolocateControl
                        style={geolocateStyle}
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        showUserLocation={false}
                        auto={autoGeolocateControl}
                    />
                    <Geocoder
                        mapRef={this.mapRef}
                        onResult={this.onGeocoderResult.bind(this)}
                        viewport={viewport}
                        hideOnSelect={true}
                        onViewportChange={this.onViewportChange}
                        mapboxApiAccessToken={token}
                        trackProximity={true}
                    />
                    {GeocoderSearchMarker}
                    <div style={fullscreenControlStyle}>
                        <FullscreenControl />
                    </div>
                    <div style={navStyle}>
                        <NavigationControl />
                    </div>
                    <div style={scaleControlStyle}>
                        <ScaleControl />
                    </div>
                    <div style={customButtonsStyle}>
                        <DropdownButton id="dropdown-basic-button" title="Map"
                            variant="secondary"
                            onSelect={this.onMapTypeChange.bind(this)}>
                            <Dropdown.Item eventKey={mapTypes.satellite} className={satelliteActive} >Satellite</Dropdown.Item>
                            <Dropdown.Item eventKey={mapTypes.light} className={lightActive} >Light</Dropdown.Item>
                            <Dropdown.Item eventKey={mapTypes.basic} className={basicActive} >Basic</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </ReactMapGL>
            </div>
        );
    }
}

export default withRouter(MyMapBox);