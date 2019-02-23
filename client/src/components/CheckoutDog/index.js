import React, { Component } from "react";
import "../../styles/style.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";


class CheckoutDog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkoutActivity: "",
            checkoutLocation: "",
            staffid: sessionStorage.id,
            errorMessage: null
        };
    }



    checkprogress = (soc) => {
        if (soc.inprogress === true) {
            return <span className="badge badge-warning">IN PROGRESS</span>
        } else if (!soc.done) {
            return <span className="badge badge-danger">NO</span>
        } else {
            return <span className="badge badge-success">YES</span>
        }
    }


    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    handleCheckout = (dog) => {

        if (this.state.checkoutActivity && this.state.checkoutLocation) {
            let checkoutDog = {
                index: this.state.checkoutActivity,
                id: dog._id,
                location: this.state.checkoutLocation
            }
            let checkoutStaff = {
                id: this.state.staffid,
                location: this.state.checkoutLocation
            }

            if (dog.location === "Kennel") {
                API.checkoutDog(checkoutDog).then().catch();
                API.socInprogress(checkoutDog).then().catch();
                API.checkoutStaff(checkoutStaff).then().catch();
                this.props.onHide()

            } else {
                this.setState({
                    errorMessage: "Dog isn't in Kennel. Dog is located in: " + dog.location
                })
            }

        } else {
            this.setState({
                errorMessage: "Please select a socialization plan AND a location."
            })
        }

    }


    setActivityState = (soc) => {
        for (let i = 0; i < soc.length; i++) {
            if (soc[i].inprogress === true) {
                this.setState({
                    checkoutActivity: i
                })
            }
        }
    }


    render() {
        let dog = this.props.props;
        let errorMessage;

        if (this.state.errorMessage) {
            errorMessage = <div className="alert alert-danger" role="alert"> {this.state.errorMessage} </div>
        }



        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {dog.name} Signout/Kennel Return
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="instructions">To SIGN OUT a dog select what socialization you are going to complete, and what location you and the dog wil be at, then click "Signout" </h6>
                    {errorMessage}
                    <hr />
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" className="cell">Select</th>
                                    <th scope="col" className="cell">Type</th>
                                    <th scope="col" className="cell">Duration</th>
                                    <th scope="col" className="cell">AM/PM</th>
                                    <th scope="col" className="cell">Finished?</th>
                                </tr>
                            </thead>
                            {dog.socialization.map((soc, idx) =>
                                <tbody key={idx}>
                                    <tr key={dog._id} className="table-active">
                                        <td className="cell">
                                            <div >
                                                <input
                                                    type="radio"
                                                    name="checkoutActivity"
                                                    value={idx}
                                                    onChange={this.handleInputChange} />
                                            </div>
                                        </td>
                                        <td className="cell">{soc.name}</td>
                                        <td className="cell">{soc.duration}</td>
                                        <td className="cell">{soc.ampm}</td>
                                        <td className="cell">{this.checkprogress(soc)}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        <hr />
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" >Locations</label>
                            </div>
                            <Form.Control as="select" name="checkoutLocation" onChange={this.handleInputChange}>
                                <option value="">Choose...</option>
                                <option value="Off Campus" >Off Campus</option>
                                <option value="The Track" >The Track</option>
                                <option value="East Group Area" >East Group Area</option>
                                <option value="North Group Area" >North Group Area</option>
                                <option value="North Concrete Area" >North Concrete Area</option>
                                <option value="The Dirt" >The Dirt</option>
                                <option value="Grassy 1" >Grassy 1</option>
                                <option value="Grassy 2" >Grassy 2</option>
                                <option value="Grassy 3" >Grassy 3</option>
                                <option value="South Concrete Area">South Concrete Area</option>
                            </Form.Control>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ backgroundColor: 'rgb(14,166,197)' }} onClick={() => this.handleCheckout(dog)} >Signout</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CheckoutDog;
