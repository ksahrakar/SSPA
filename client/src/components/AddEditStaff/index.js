import React, { Component } from "react";
import "../../styles/style.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import StaffForm from "../StaffForm";
import API from "../../utils/API";

class AddEditStaff extends Component {

    updateState = (newState) => {
        this.setState({
            ...newState
        })
    }

    updateStaff = (vteer) => {
        API.updateStaff(vteer)
            .then(this.props.onHide)
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add or Edit Staff
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StaffForm staff={this.props.props} update={this.updateState} />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:'rgb(14,166,197)'}} onClick={this.props.onHide}>Close</Button>
                    <Button style={{backgroundColor:'rgb(14,166,197)'}} onClick={() => this.updateStaff(this.state)}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddEditStaff;