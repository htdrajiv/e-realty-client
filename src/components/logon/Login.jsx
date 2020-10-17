import React from 'react';
import { NavLink, Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux'
import ReduxConstants from '../../redux/ReduxConstants.jsx'
import { withCookies } from 'react-cookie';
import { Form, Button } from 'react-bootstrap';

const emailRegex = new RegExp("^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");
const passwordRegex = new RegExp();

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            rememberMe: false, validated: false,
            userNameValidationMessage: "Please enter valid username",
            passwordValidationMessage: "Please enter valid password",
            userName: "",
            password: ""
        })
        this.toggleRememberMe = this.toggleRememberMe.bind(this);
        this.handleAuthChange = this.handleAuthChange.bind(this);
    }

    componentDidMount() {
        // if (localStorage.rememberMe && localStorage.auth.userName !== "") {
        //     this.setState({
        //         rememberMe: true,
        //         userName: localStorage.auth.username,
        //         password: localStorage.auth.password
        //     })
        // }
    }

    toggleRememberMe(event) {
        this.setState({
            rememberMe: event.target.checked
        })
    }

    onGoogleLoginFailure(response) {
        alert("Login failure.. Please try again")
    }

    onGoogleLoginSuccess(response) {
        let _obj = this.createLoginDispatchResponse(response.profileObj);
        this.props.cookies.set("auth_details", _obj, { path: '/' });
        this.props.login(_obj, function () {
            window.location.href = "/";
        }());

    }

    createLoginDispatchResponse(userObj) {
        return {
            type: ReduxConstants.LOGIN,
            authProvider: ReduxConstants.AUTH_PROVIDER_GOOGLE,
            userId: userObj.email,
            userName: userObj.name,
            image: userObj.imageUrl
        };
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        localStorage.userName = this.state.userName;
        localStorage.password = this.state.password;
        localStorage.rememberMe = this.state.rememberMe;
        this.setState({
            validated: true
        })
    };

    handleAuthChange(event) {
        let regexChecker = event.target.type === "userName" ? emailRegex : passwordRegex;
        if (!regexChecker.test(event.target.value)) {
            this.setState({
                [event.target.name + "ValidationMessage"]: "Please enter a valid value.",
                [event.target.name]: event.target.value
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }


    render() {

        const { userNameValidationMessage, passwordValidationMessage, validated, userName, password } = this.state;
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <span>
                        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                            <h3>Sign In</h3>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={this.handleAuthChange}
                                    required
                                    value={userName || ""}
                                    name="userName"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {userNameValidationMessage}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={this.handleAuthChange}
                                    value={password || ""}
                                    name="password"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passwordValidationMessage}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check onChange={this.toggleRememberMe} type="checkbox" label="Remember Me" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <p className="forgot-password text-right">
                                <a href="#">Forgot Password?</a>
                            </p>
                            <p className="forgot-password text-right">
                                Not Registered Yet?
                                <NavLink className="" to="/signUp">
                                    <span className="glyphicon glyphicon-user"></span> Sign Up
                                </NavLink>
                            </p>
                            <p>
                                <GoogleLogin
                                    clientId="729316250417-ar2vfc7vhnic45t1plc41oik8hotv0k8.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.onGoogleLoginSuccess.bind(this)}
                                    onFailure={this.onGoogleLoginFailure.bind(this)}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </p>
                        </Form>
                    </span>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (actionObj) => {
            dispatch(actionObj)
        }
    };
}

export default withCookies(connect(null, mapDispatchToProps)(Login));
