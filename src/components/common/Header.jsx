import React from 'react';
import { Route, NavLink, HashRouter, BrowserRouter, Link, Redirect } from "react-router-dom";
import HeaderJson from '../headers/Headers.json'
import { connect } from "react-redux";
import { GoogleLogout } from 'react-google-login';
import ReduxConstants from '../../redux/ReduxConstants.jsx'
import { withCookies } from 'react-cookie';
import ImageLoader from '../ImageLoader.jsx'
import BurgerMenu from './BurgerMenu.jsx'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrolled: false, scrolledClass: ""
        }
        this.makeStickyHeader = this.makeStickyHeader.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.makeStickyHeader)
    }

    makeStickyHeader() {
        const offset = window.scrollY;
        if (offset > 175) {
            this.setState({
                scrolled: true,
                scrolledClass: "fixed-top"
            });
        }
        else {
            this.setState({
                scrolled: false,
                scrolledClass: ""
            });
        }
    }

    getLogoutSection() {
        const { cookies, auth_details } = this.props;
        let _this = this;
        return (
            <div key='logout_section'>
                <a href="/profile">
                    <img title={auth_details.userName} className="profile-pic right-margin-1" src={auth_details.image} />
                </a>
                <GoogleLogout
                    clientId="729316250417-ar2vfc7vhnic45t1plc41oik8hotv0k8.apps.googleusercontent.com"
                    render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            Logout
                        </button>
                    )}
                    buttonText="Logout"
                    onLogoutSuccess={_this.logout.bind(_this)}
                >
                </GoogleLogout>
            </div>
        )
    }

    logout() {
        this.props.logout(function () {
            window.location.href = "/login";
        });
    }

    prepareHeaderComponents() {
        let headers = { leftHeaders: [], rightHeaders: [] };
        for (let item in HeaderJson) {
            let header = HeaderJson[item];
            if (header.display && header.roles.indexOf(this.props.auth_details.softRole) > -1) {
                if (header.render !== null) {
                    headers[header.position + "Headers"].push(this[header.render]());
                } else {
                    headers[header.position + "Headers"].push(
                        <li className={header.className} key={item}>
                            <NavLink exact={header.exact} className="text-white" key={item} to={header.to}>{header.text}</NavLink>
                        </li>
                    );
                }
            }

        }
        return headers;
    }

    render() {
        const { scrolled, scrolledClass } = this.state;
        let headers = this.prepareHeaderComponents();
        return (
            <div className={"header"}>
                {scrolled && <div id="fillStickyScrolledArea" className={""} style={{ height: "7vh", width: "5vh" }} />}
                <nav className={"navbar navbar-expand-lg navbar-dark bg- rounded " + scrolledClass}>
                    <a className="navbar-brand" href="/">
                        <ImageLoader name='logo1.png' alt='E-Realty' style={{ height: "4vh", width: "5vh" }} />
                    </a>
                    <ul className="navbar-nav">
                        {headers["leftHeaders"]}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {headers["rightHeaders"]}
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth_details: state
    };
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        logout: (callBack) => {
            ownProps.cookies.remove("auth_details", { path: '/' });
            dispatch({ type: ReduxConstants.LOGOUT }, callBack())
        }
    };
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Header));