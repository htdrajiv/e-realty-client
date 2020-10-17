import React, { Fragment } from 'react';
// import MyMap from '../../plotly/mapbox/MyMap.jsx'
import MyMap from '../../mapbox/MyMapBox.jsx'
import { CardColumns, Card, Carousel, Form, Button } from 'react-bootstrap'
import FilterBar from '../Filter/FilterBar.jsx'
import propertySeeder from '../../../seeders/properties.json'
import ImageLoader from "../../ImageLoader";

const cardViewType = { "DECK": "DECK", "ROW": "ROW" }

let localFilters = { cardViewType: cardViewType.DECK }

function PropertyCards_Deck() {
    let cards = [];
    let _card = {};
    for (var d in propertySeeder) {
        cards.push(
            <Card key={d} bg={'light'} border="success" className="mb-3">
                {/* <Card.ImgOverlay> */}
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <ImageLoader classNames="card-img" name="home.jpg" style={{ height: '100%', width: '100%' }} />
                    <Card.Text>
                        This is a wider card.
                        </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
                {/* </Card.ImgOverlay> */}
            </Card>
        )
    }
    return (
        <CardColumns>{cards}</CardColumns>
    )
}

function PropertyCards_Row() {
    let cards = [];
    let _card = {};
    for (var d in propertySeeder) {
        cards.push(
            <div className="bottom-padding-1" key={d} >
                <Card bg={'light'} border="success" className="bm-3">
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                            <ImageLoader classNames="card-img" name="home.jpg" style={{ height: '20%', width: '20%' }} />
                        This is a wider card.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
    return (
        <Fragment> {cards} </Fragment>
    )
}

function PropertyCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=373940"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

const SortBy = (props) => {
    return (
        <Form>
            <Form.Group md="4" controlId="carParkingSpaceFormGrp" className={"form-inline"}>
                <Form.Label>Sort By: </Form.Label>
                <Form.Control as="select"
                    defaultValue="Choose..."
                    onChange={(e) => {
                        console.log(e.target.value)
                    }}
                >
                    <option value="choose">Choose...</option>
                    <option value="lh">Price(Low-High)</option>
                    <option value="hl">Price(High-Low)</option>
                    <option value="na">Newly Added</option>
                </Form.Control>
            </Form.Group>
        </Form>
    )
}

const ViewType = (props) => {
    return (
        <div >
            <Button variant="info" onClick={() => {
                localFilters.cardViewType = cardViewType.ROW;
                props.reload();
            }} className="right-margin-1"> <i className="fas fa-bars"></i> </Button>
            <Button variant="info" onClick={() => {
                localFilters.cardViewType = cardViewType.DECK;
                props.reload();
            }}> <i className="fas fa-border-all"></i> </Button>
        </div>
    )
}


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            reloadPage: "JustToReload",
            currentPosition: {
                latitude: 0.0, longitude: 0.0,
            },
            sortBy: ""
        });
        this.setCurrentLocation = this.setCurrentLocation.bind(this);
        this.watchUserMovement = this.watchUserMovement.bind(this);
        this.reload = this.reload.bind(this);

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
                    currentPosition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            });
        }
    }

    reload() {
        this.setState({
            reload: "JustToReload"
        })
    }

    render() {
        let { currentPosition } = this.state;
        let propertyData = { scattermapbox: { lat: [], lon: [] } }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <FilterBar />
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ width: "45%" }}>
                        <MyMap
                            propertyData={propertyData}
                            currentPosition={currentPosition}
                            height={"75vh"}
                            width={"100%"}
                        />
                    </div>
                    <div className="col" style={{ width: "15%" }}>
                        <div className="row" style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className="col-5">
                                <SortBy />
                            </div>
                            <div className="col-2">
                                <ViewType reload={this.reload} />
                            </div>

                        </div>
                        <div className="row overflow-auto" style={{ height: "70vh" }}>
                            {(localFilters.cardViewType === cardViewType.DECK) && <PropertyCards_Deck />}
                            {(localFilters.cardViewType === cardViewType.ROW) && <PropertyCards_Row />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;