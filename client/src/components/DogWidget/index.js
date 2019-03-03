import React, { Component } from "react";
import "../../styles/dog.css";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import CheckoutDog from "../CheckoutDog";
import AddEditDog from "../AddEditDog";
import Image from "react-bootstrap/Image";
import moment from "moment";

class DogWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dog: {
                socialization: []
            },
            modalShow: false,
            modalInfo: {
                socialization: []
            },
            modal2Show: false,
            modal2Info: {
                socialization: []
            },
            checkoutActivity: "",
            staffid: sessionStorage.id,
            permissions: null
        };
    }

    componentDidMount() {
        this.getDog()
        this.setState({
            permissions: this.props.permissions
        })
    }

    getDog = () => {
        API.getDog(this.props.props)
            .then(res => this.setState({
                dog: res.data
            }, () => {
                this.setActivityState(this.state.dog.socialization);
            })).catch(err => console.log(err));

    }

    loadModal = (dog) => {
        this.setState({ modalInfo: dog });
        this.setState({ modalShow: true })
    }

    loadModal2 = (dog) => {
        this.setState({ modal2Info: dog });
        this.setState({ modal2Show: true })
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

    setActivityState = (soc) => {
        for (let i = 0; i < soc.length; i++) {
            if (soc[i].inprogress === true) {
                this.setState({
                    checkoutActivity: i
                })
            }
        }
    }


    findprogress = (soc, dog) => {
        for (let i = 0; i < soc.length; i++) {
            if (soc[i].inprogress === true) {
                this.setState({
                    checkoutActivity: i
                }, () => {
                    this.kennelReturn(dog)
                })
            }
        }


    }

    kennelReturn = (dog) => {
        let returnDog = {
            index: this.state.checkoutActivity,
            id: dog._id,
        }
        let returnStaff = {
            id: this.state.staffid
        }
        API.returnDog(returnDog).then().catch();
        API.socDone(returnDog).then().catch();
        API.socDone2(returnDog).then().catch();
        API.returnStaff(returnStaff).then().catch();
        this.getDog()

    }

    render() {

        let modalClose = () => {
            this.setState({ modalShow: false }, () => {
                this.getDog();
            });
        };

        let modal2Close = () => this.setState({ modal2Show: false }, () => {
            this.getDog();
        });


        let signoutButton;

        if (this.state.dog.location === "Kennel") {
            signoutButton = <Button style={{ backgroundColor: 'rgb(14,166,197)' }} variant="primary" className="btn btn-lg signoutBtn" onClick={() => this.loadModal(this.state.dog)}>Signout Dog</Button>
        } else {
            signoutButton = <Button style={{ backgroundColor: 'rgb(14,166,197)' }} varient="primary" className="btn btn-lg returnBtn" onClick={() => this.findprogress(this.state.dog.socialization, this.state.dog)}>Kennel Return</Button>
        };

        let editDogBtn;
        let permissions = this.state.permissions;
        if (permissions !== "user") {
            editDogBtn = (
                <div className="buttonSpace">
                    <Button style={{ backgroundColor: 'rgb(14,166,197)' }} className="btn btn-lg newDogBtn" variant="primary" onClick={() => this.loadModal2(this.state.dog)}>Edit Dog</Button>
                    <AddEditDog show={this.state.modal2Show} onHide={modal2Close} props={this.state.modal2Info} />
                </div>)
        } else {
            editDogBtn = (<div className="buttonSpace">
            </div>)
        }

        return (

            <div className="container" >
                <div className="row">
                    <div className="col infoContainer">
                        {signoutButton}
                        <CheckoutDog show={this.state.modalShow} onHide={modalClose} props={this.state.modalInfo} />
                        <hr />
                        <div className="d-flex">
                            <Image src={this.state.dog.pic} alt="dog pic" className="img-thumbnail" rounded />
                            <div>
                                <h3>
                                    <span name="dogName" className="labels">{this.state.dog.name}</span>
                                </h3>
                                <h3>
                                    <span name="kennelLabel" className="labels">Kennel: </span><span name="kennelNo">{this.state.dog.kennel}</span>
                                </h3>
                                <h5>
                                    <span name="IDLabel" className="labels">ID: </span><span name="ID"> {this.state.dog.shelterID}</span>
                                </h5>
                                <h5>
                                    <span name="locLabel" className="labels">Current Location: </span><span name="ID"> {this.state.dog.location}</span>
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div>
                                <h3 name="descriptionLabel" className="labels">Intake Date:</h3>
                            </div>
                            <div>
                                <h5 name="description" className="notes">{moment(this.state.dog.intakeDate).format("M-D-YYYY")}</h5>
                            </div>
                            <div>
                                <h3 name="descriptionLabel" className="labels">Description:</h3>
                            </div>
                            <div>
                                <h5 name="description" className="notes">{this.state.dog.description}</h5>
                            </div>
                            <div>
                                <h3 name="notesLabel" className="labels">Notes:</h3>
                            </div>
                            <div>
                                <h5 name="notes" className="notes">{this.state.dog.notes}</h5>
                            </div>
                            {editDogBtn}
                        </div>
                    </div>
                    <div className="col socContainer">
                        <h3 name="socLabel" className="labels">Socialization Plan</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" className="cell">Type</th>
                                    <th scope="col" className="cell">Duration</th>
                                    <th scope="col" className="cell">AM/PM</th>
                                    <th scope="col" className="cell">Finished?</th>
                                </tr>
                            </thead>
                            {this.state.dog.socialization.map((soc, i) =>
                                <tbody key={i}>
                                    <tr className="table-active">
                                        <td className="cell">{soc.name}</td>
                                        <td className="cell">{soc.duration}</td>
                                        <td className="cell">{soc.ampm}</td>
                                        <td className="cell">{this.checkprogress(soc, i)}</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        )

    }

};


export default DogWidget;

