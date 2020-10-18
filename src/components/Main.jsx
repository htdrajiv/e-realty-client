import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Header from './common/Header.jsx'
import Footer from './common/Footer.jsx'
import Routes from './Routes.jsx'
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({

        })
    }



    render() {
        return (
            <div id="main-wrapper" className="">
                <div className="">
                    <ToastContainer position={toast.POSITION.TOP_RIGHT} style={{ zIndex: 150000 }} />
                    <BrowserRouter>
                        <div id="my-app">
                            <Header />
                            <div className="contents">
                                <Routes />
                            </div>
                            <Footer />
                        </div>
                    </BrowserRouter>
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        count: state
    };
}
export default connect(mapStateToProps)(Main);