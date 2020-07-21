import React from 'react';
import { Alert } from 'react-bootstrap';

export class ErrorAlert extends React.Component {
    render() {
        return (
            !!this.props.errorMessage &&
            <p className="d-block p-2">
                <Alert variant="danger">{ this.props.errorMessage }</Alert>
            </p>
        );
    }
}