import React, { useState } from 'react';
import Slider, { Range } from 'rc-slider';
import { Button, Dropdown, FormControl, Modal, Form, InputGroup, Spinner } from 'react-bootstrap'

const FILTER_TYPES = { "PRICE": "PRICE" }
const FILTER = { [FILTER_TYPES.PRICE]: { minPrice: "", maxPrice: "" } }

class PriceFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            reload: false, validated: false
        })
        this.reload = this.reload.bind(this);
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setValidated(true);
    };

    setValidated(flag) {
        this.setState({
            validated: flag
        })
    }

    reload(fieldKey, event) {
        FILTER["PRICE"][fieldKey] = event.target.value;
        this.setState({
            reload: true
        })
    }

    render() {
        const { validated } = this.state;
        return (
            <div>
                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Form.Group md="4" controlId="priceFilterFormGrp">
                        <Form.Label className="">Min Price</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            step="1"
                            placeholder="Min Price"
                            max={FILTER[FILTER_TYPES.PRICE]["maxPrice"]}
                            value={FILTER[FILTER_TYPES.PRICE]["minPrice"]}
                            onChange={this.reload.bind(this, 'minPrice')}
                        />
                        <Form.Control.Feedback type="invalid">
                            Only Numbers, Less Than Max
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom02">
                        <Form.Label className="">Max Price</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            step="1"
                            placeholder="Max Price"
                            min={FILTER[FILTER_TYPES.PRICE]["minPrice"]}
                            value={FILTER[FILTER_TYPES.PRICE]["maxPrice"]}
                            onChange={this.reload.bind(this, 'maxPrice')}
                        />
                        <Form.Control.Feedback type="invalid">
                            Only Numbers, Greater Than Min
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="bg-success">Apply</Button>
                </Form>

            </div>
        )
    }
}

function TypeFilter() {
    return (
        <div>
            <Form>
                <Form.Group md="4" controlId="propertyTypeFormGrp">
                    <Form.Label className="">Property Type</Form.Label>
                    <Form.Control as="select" multiple>
                        <option>For Rent</option>
                        <option>For Sell</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="bg-success">Apply</Button>
            </Form>
        </div>
    )
}

function MoreFilter() {
    return (
        <div>
            <Form>
                <Form.Group md="4" controlId="carParkingSpaceFormGrp">
                    <Form.Label className="">Car Parking Space:</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group md="4" controlId="bikeParkingSpaceFormGrp">
                    <Form.Label className="">Bike Parking Space:</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group md="4" controlId="yearBuiltFormGrp">
                    <Form.Label className="">Year Built:</Form.Label>
                    <Form.Control as="select" defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="bg-success">Apply</Button>
            </Form>
        </div>
    )

}

class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            priceSection: false, validated: false, saveFilter: false,
            filterSections: ['priceSection', 'typeSection', 'moreSection']
        })
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleSection = this.toggleSection.bind(this);

        this.handleSaveFilter = this.handleSaveFilter.bind(this);
    }

    toggleSection(name, e) {
        for (var section of this.state.filterSections) {
            if (name !== section)
                this.state[section] = false;
        }
        this.setState({
            [name]: !this.state[name]
        })
    }

    openModal(name, e) {
        this.setState({
            [name]: true
        })
    }

    closeModal(name, e) {
        this.setState({
            [name]: false
        })
    }



    handleSaveFilter(event) {
        this.setState({
            saveFilter: event.target.checked
        })

    }

    getFilterSection(filter, filterSection) {
        return (
            this.state[filterSection] && (
                <div className="filter_section_expanded">
                    {filter}
                </div>
            )
        )
    }

    render() {
        return (
            <div className='filter-bar'>
                <ul className="filter-list list-group list-group-horizontal">
                    <li className="filter-list-item">
                        <button className="btn btn-outline-secondary" onClick={this.toggleSection.bind(this, 'priceSection')}>
                            Price
                        </button>
                        {this.getFilterSection(<PriceFilter />, 'priceSection')}
                    </li>

                    <li className="filter-list-item">
                        <button className="btn btn-outline-secondary" onClick={this.toggleSection.bind(this, 'typeSection')}>
                            Property Type
                        </button>
                        {this.getFilterSection(<TypeFilter />, 'typeSection')}
                    </li>

                    <li className="filter-list-item">
                        <button className="btn btn-outline-secondary" onClick={this.toggleSection.bind(this, 'moreSection')}>
                            More Options
                        </button>
                        {this.getFilterSection(<MoreFilter />, 'moreSection')}
                    </li>
                </ul>
            </div >
        )
    }
}

export default FilterBar;