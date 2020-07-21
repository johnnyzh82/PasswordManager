import React from 'react';
import { LOGIN_STATUS } from "../data/AuthData";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Person, Key, Link45deg } from 'react-bootstrap-icons';

export class NavBar extends React.Component {
    render() {        
        const loggedIn = this.props.loginStatus === LOGIN_STATUS.LOGIN_SUCCESS;
        const loggedInProgress = this.props.loginStatus === LOGIN_STATUS.IN_PROGRESS;
        return (
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#">
              <Key />
              &nbsp;&nbsp;Johnny's Password Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto"></Nav>
  
              {/************************** Go to portal link **************************/}
              <Button href="https://portal.azure.com" target="_blank" variant="outline-info" className="mr-sm-3">
                <Link45deg />
                &nbsp;&nbsp;Go to Azure Portal
              </Button>
  
              {/************************** Progress button **************************/}
              { loggedInProgress &&
              (<Button variant="outline-info" className="mr-sm-3" disabled>
                <Person />&nbsp;&nbsp;Loading...
              </Button>)}
  
              {/************************** Login button **************************/}
              {!loggedIn && !loggedInProgress &&
              (<Button variant="outline-info" className="mr-sm-3" onClick={this.props.login}>
                <Person />&nbsp;&nbsp;Login
              </Button>)}
  
              {/************************** Logout button **************************/}
              {loggedIn && !loggedInProgress &&
              (<Button variant="outline-info" className="mr-sm-3" onClick={this.props.logout}>
                <Person />&nbsp;&nbsp;Logout
              </Button>)}
            </Navbar.Collapse>
          </Navbar>
        );
    }
}