import React from "react";
import { Button, Card } from "react-bootstrap";

export class ActionCard extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (            
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.description}</Card.Text>
                    <Button variant={this.props.variant || "primary"} onClick={this.props.onClick}>{this.props.action}</Button>
                </Card.Body>
            </Card>
        );
    }
}