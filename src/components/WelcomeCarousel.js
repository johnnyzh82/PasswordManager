import React from "react";
import { Carousel } from "react-bootstrap";
import { LOGIN_STATUS } from "../data/AuthData";

export class WelcomeCarousel extends React.Component {
    render() {
        const notLoggedIn = this.props.loginStatus === LOGIN_STATUS.NOT_LOGIN
            || this.props.loginStatus === LOGIN_STATUS.IN_PROGRESS;
        
        const items = [...Array(4).keys()].map(i => {
            return <Carousel.Item key={i}>
                <img className="d-block w-100" src={require(`../assets/img/meme${i}.jpg`)} alt="meme" />
            </Carousel.Item>
        });

        return (
            !!notLoggedIn &&
            <Carousel className="mt-5 mx-auto w-50">
                {items}
            </Carousel>
        );
    }
}