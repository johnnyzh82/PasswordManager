import React from "react";
import { Carousel } from "react-bootstrap";

export class WelcomeCarousel extends React.Component {
    render() {
        const items = [...Array(4).keys()].map(i => {
            return <Carousel.Item key={i}>
                <img className="d-block w-100" src={require(`../assets/img/meme${i}.jpg`)} alt="meme" />
            </Carousel.Item>
        });

        return (
            <Carousel className="mt-5 ml-auto mr-auto w-50">
                {items}
            </Carousel>
        );
    }
}