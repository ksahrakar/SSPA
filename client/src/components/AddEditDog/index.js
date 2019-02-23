import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DogForm from "../DogForm";
import API from "../../utils/API";



class AddEditDog extends Component {

    updateState = (newState) => {
        this.setState({
            ...newState
        })
    }

    updateDog = (dog) => {
        API.updateDog(dog)
            .then(this.props.onHide)
            .catch(err => console.log(err));
    }

    render() {

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add or Edit Dog
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DogForm dog={this.props.props} update={this.updateState} />
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{backgroundColor:'rgb(14,166,197)'}} onClick={this.props.onHide}>Close</Button>
                    <Button style={{backgroundColor:'rgb(14,166,197)'}} onClick={() => this.updateDog(this.state)}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddEditDog;