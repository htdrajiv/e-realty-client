import React from 'react';
import {NavLink} from "react-router-dom";

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = ({

        })
    }

    render(){
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <span>
                        <form>
                            <h3>Sign Up</h3>

                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="required form-control" placeholder="First name" />
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            <p className="forgot-password text-right">
                                Already registered?
                                <NavLink className="" to="/login">
                                    <span className="glyphicon glyphicon-log-in"></span> Login
                                </NavLink>
                            </p>
                        </form>
                    </span>
                </div>
            </div>
        );
    }
}

export default SignUp;