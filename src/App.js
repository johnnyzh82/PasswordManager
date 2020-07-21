import React from "react";
import { LOGIN_STATUS, loginPopup, LOGIN_SCOPES } from "./data/AuthData";
import { WelcomeCarousel } from "./components/WelcomeCarousel";
import { NavBar } from "./components/NavBar";
import { ErrorAlert } from "./components/ErrorAlert";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props){
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      loginStatus: LOGIN_STATUS.NOT_LOGIN,
      errorMessage: null,
    };
  }

  async login() {
    try {
      this.setState({ loginStatus: LOGIN_STATUS.IN_PROGRESS });
      const loginResponse = await loginPopup(LOGIN_SCOPES);
      console.log("loginResponse", loginResponse);
      this.setState({
        loginStatus: LOGIN_STATUS.LOGIN_SUCCESS,
        errorMessage: null,
      });
    } catch (error) {
      this.setState({
        loginStatus: LOGIN_STATUS.LOGIN_ERROR,
        errorMessage: !!error ? error.toString() : "Error encountered when attempt to login",
      });
    }
  }
  
  logout() {
    this.setState({ loginStatus: LOGIN_STATUS.IN_PROGRESS });
    console.log("you're logged out");

    setTimeout(() => {
      this.setState({
        loginStatus: LOGIN_STATUS.NOT_LOGIN,
        errorMessage: null,
      });
    }, 800)
  }

  render() {
    return (
      <div>
        <NavBar loginStatus={this.state.loginStatus} 
                login={this.login} 
                logout={this.logout} />
        <ErrorAlert errorMessage={this.state.errorMessage} />
        <WelcomeCarousel />
      </div>
    );
  }
}

export default App;
