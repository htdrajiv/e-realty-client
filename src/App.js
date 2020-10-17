import React from 'react';
import logo from './logo.svg';
import Main from './components/Main.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({

    })
  }

  componentWillMount() {
    let { cookies } = this.props;
    let authDetails = cookies.get("auth_details");
    this.props.mapCookieToRedux((authDetails !== null && typeof authDetails !== "undefined") ? authDetails : { type: "LOGOUT" })
  }

  render() {
    return (
      <div className="">
        <Main />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    mapCookieToRedux: (actionObj) => {
      dispatch(actionObj)
    }
  };
}


export default withCookies(connect(null, mapDispatchToProps)(App));
