import React, { Component } from "react";
import "../../styles/style.css";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AddEditStaff from "../AddEditStaff";


class VolunteerList extends Component {

    state = {
        voteers: [],
        modalShow: false,
        inactive: false
    };

    componentDidMount() {
        this.findAllStaff()
    };

    findAllStaff = () => {
        API.getAllStaff()
            .then(res => this.setState({ voteers: res.data }, () => {
                this.setState({
                    inactive: false
                })
            })).catch(err => console.log(err));
    };

    findInactiveStaff = () => {
        API.getInactiveStaff()
            .then(res => this.setState({
                voteers: res.data
            }, () => {
                this.setState({
                    inactive: true
                })
            })).catch(err => console.log(err));
    };

    loadModal = () => {
        this.setState({ modalShow: true })
    };

    checkstatus = (avail) => {
        if (avail) {

            return <span className="available-badge badge badge-success"> YES </span>

        } else {
            return <span className="available-badge badge badge-danger"> NO </span>
        }
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false }, () => {
            this.findAllStaff();
        });

        const isInactive = this.state.inactive;
        let button;
        if (isInactive) {
            button = <Button style={{backgroundColor:'rgb(14,166,197)',marginBottom:'10px'}} className="btn btn-lg" variant="primary" onClick={() => this.findAllStaff()}>Staff Currently Logged-In </Button>;
        } else {
            button = <Button style={{backgroundColor:'rgb(14,166,197)',marginBottom:'10px'}} className="btn btn-lg" variant="primary" onClick={() => this.findInactiveStaff()}>Staff Not Logged-In</Button>;
        };

        let newSButtons;
        let isAdmin = sessionStorage.admin;
        if (isAdmin==="true"){
            newSButtons = (
            <div className="buttonSpace">
            <Button style={{backgroundColor:'rgb(14,166,197)',marginBottom:'10px'}} className="btn btn-lg newStaffBtn" variant="primary" onClick={() => this.loadModal()}>New Staff</Button>
            <AddEditStaff show={this.state.modalShow} onHide={modalClose}/>
            {button}
            </div>)
        } else {
            newSButtons = (<div className="buttonSpace">
               {button}
            </div>)
        }

        return (
            <div className="container">
                <div className="buttonSpace">
                    {newSButtons}
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="headings">Volunteer</th>
                            <th scope="col" className="headings">E-mail</th>
                            <th scope="col" className="headings">Mobile</th>
                            <th scope="col" className="headings">Avail?</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.voteers.map(voteer => (
                            <tr key={voteer._id}>
                                <th>{voteer.name}</th>
                                <th>{voteer.email}</th>
                                <th>{voteer.mobile}</th>
                                <th>{this.checkstatus(voteer.available)}</th>
                                <th> <Link to={"/staff/" + voteer._id} >More</Link> </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        )
    }

}

export default VolunteerList;