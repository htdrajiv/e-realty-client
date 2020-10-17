import React from 'react';
import { Route, Switch, BrowserRouter, HashRouter, Redirect, withRouter } from "react-router-dom";
import MyProperty from './pages/user/MyProperty.jsx'
import Home from './pages/Home.jsx'
import GuestContacts from './pages/guest/Contacts.jsx'
import Contacts from './pages/user/Contacts.jsx'
import GuestSearch from './pages/guest/Search.jsx'
import Search from './pages/user/Search.jsx'
import Profile from './pages/user/Profile.jsx'
import Login from '../components/logon/Login.jsx'
import SignUp from '../components/logon/SignUp.jsx'
import { connect } from "react-redux";
import ReduxConstants from "../redux/ReduxConstants.jsx"

const ROLES = {
    "GUEST": "GUEST", "USER": "USER"
};

const routes = {
    [ROLES.USER]: [
        { path: '/', redirectPath: "/", exact: true, name: 'home', component: Home, roles: [ROLES.GUEST, ROLES.USER] },
        { path: '/myProperty', redirectPath: "/login", exact: false, name: 'myProperty', component: MyProperty, roles: [ROLES.USER] },
        { path: '/search', redirectPath: "/", exact: false, name: 'search', component: Search, roles: [ROLES.USER] },
        { path: '/search/:searchText', redirectPath: "/", exact: false, name: 'search', component: Search, roles: [ROLES.USER] },
        { path: '/profile', redirectPath: "/login", exact: false, name: 'profile', component: Profile, roles: [ROLES.USER] },
        { path: '/login', redirectPath: "/", exact: false, name: 'profile', component: Home, roles: [ROLES.USER] },
    ],
    [ROLES.GUEST]: [
        { path: '/login', redirectPath: "/", exact: false, name: 'login', component: Login, roles: [ROLES.GUEST] },
        { path: '/signUp', redirectPath: "/", exact: false, name: 'signUp', component: SignUp, roles: [ROLES.GUEST] },
        { path: '/search', redirectPath: "/", exact: false, name: 'search', component: GuestSearch, roles: [ROLES.GUEST] },
        { path: '/', redirectPath: "/", exact: true, name: 'home', component: Home, roles: [ROLES.GUEST, ROLES.USER] },
        { path: '/*', redirectPath: "/", exact: false, name: 'contacts', component: Login, roles: [ROLES.GUEST, ROLES.USER] },
    ]
}

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({

        });
    }

    getRoutes(auth_role) {
        let _routes = routes[auth_role]
        if (typeof _routes !== "undefined" || _routes !== null) {
            return _routes.map((route, idx) => {
                return (
                    <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        component={(props) => {
                            return route.roles.indexOf(auth_role) > -1 ? <route.component {...props} /> :
                                <Redirect to={route.redirectPath} />
                        }}
                    />
                )
            });
        } else {
            return [];
        }

    }

    render() {
        const { auth_details } = this.props;
        let authRole = auth_details.softRole;
        return (
            <div className="body">
                <Switch>
                    {this.getRoutes(authRole)}
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth_details: state
    };
}

export default connect(mapStateToProps)(Routes);