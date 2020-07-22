import React from "react";
import { Container, Dropdown, DropdownButton, Row, Col } from "react-bootstrap";
import { LOGIN_STATUS } from "../data/AuthData";
import { listKeyVault } from "../data/ArmData";
import { ActionCard } from "./ActionCard";

import "../assets/css/MainFrame.css";

export class MainFrame extends React.Component {
    constructor(props){
        super(props);

        this.onKeyVaultSelect = this.onKeyVaultSelect.bind(this);
        this.state = {
            keyvaults: [],
            selected: null,
        };
    }

    componentWillReceiveProps(props) {
        if (!!props.accessToken) {            
            listKeyVault(props.accessToken).then((response) => {
                this.setState({
                    keyvaults: response.value,
                    selected: response.value[0]
                });
            });
        }
    }

    onKeyVaultSelect(selected) {
        this.setState({
            selected: JSON.parse(selected),
        });
    }

    render() {
        const loggedIn = this.props.loginStatus === LOGIN_STATUS.LOGIN_SUCCESS;
        const items = this.state.keyvaults.map(kv => {
            return <Dropdown.Item key={kv.id} eventKey={JSON.stringify(kv)}>
                {kv.name}
            </Dropdown.Item>
        });
        
        return (            
            !!loggedIn &&
            (
                <div>
                    <DropdownButton id="dropdown-basic-button"
                                    size="md"
                                    className="mx-auto mt-2 dropdown-basic-button"
                                    variant="info"
                                    title={this.state.selected?.name || ""}
                                    onSelect={this.onKeyVaultSelect}>
                        {items}
                    </DropdownButton>
                    { !!this.state.selected &&
                        (<Container className="mt-4">
                            <Row className="mt-2">
                                <Col md={{ span: 3, offset: 3 }}>                            
                                    <ActionCard title="Add Password" 
                                                description="Insert a new pair of login/password into the password manager." 
                                                action="Add"
                                                onClick={() => {}} />
                                </Col>
                                <Col md={{ span: 3, offset: 0 }}>                            
                                    <ActionCard title="Rotate Password" 
                                                description="Generate a new random password for given login by the password manager." 
                                                action="Update"
                                                variant="success"
                                                onClick={() => {}} />
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col md={{ span: 3, offset: 3 }}>                            
                                    <ActionCard title="Display Password" 
                                                description="Display your current password for given login in the password manager." 
                                                action="Display"
                                                variant="info"
                                                onClick={() => {}} />
                                </Col>
                                <Col md={{ span: 3, offset: 0 }}>                            
                                    <ActionCard title="Delete Password" 
                                                description="Delete the old pair of login/password in the password manager." 
                                                action="Delete"
                                                variant="danger"
                                                onClick={() => {}} />
                                </Col>
                            </Row>
                        </Container>)
                    }
                </div>
            )
        );
    }
}