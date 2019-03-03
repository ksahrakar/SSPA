import React, { Component } from "react";
import "../../styles/style.css";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import AddEditStaff from "../AddEditStaff";


class StaffListWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            staff: {},
            permissions: null
        };
    };

    componentDidMount() {
        this.findStaff()
        this.setState({
            permissions: this.props.permissions
        })
    }

    findStaff = () => {
        API.getStaff(this.props.props)
            .then(res => this.setState({ staff: res.data }))
            .catch(err => console.log(err));
    }

    loadModal = (staff) => {
        this.setState({ modalInfo: staff });
        this.setState({ modalShow: true })
    }



    render() {
        let modalClose = () => this.setState({ modalShow: false }, () => {
            this.findStaff();
        });

        let showPic;
        if (this.state.staff.pic) {
            showPic = (
                <img src={this.state.staff.pic} alt="staff pic" className="img-thumbnail" />
            )
        } else {
            showPic = (
                <img src="https://i.postimg.cc/3RmkQzvB/Someone.jpg" alt="staff pic" className="img-thumbnail" />
            )
        }

        let editStaffBtn;
        let permissions = this.state.permissions;
        if (permissions !== "user") {
            editStaffBtn = (
                <div>
                    <Button
                        variant="primary"
                        style={{ backgroundColor: 'rgb(14,166,197)' }}
                        className="btn btn-lg editBtn"
                        onClick={() => this.loadModal(this.state.staff)}>Edit Staff</Button>
                    <AddEditStaff show={this.state.modalShow} onHide={modalClose} props={this.state.modalInfo} />
                </div>
            )
        } else {
            editStaffBtn = (
                <div></div>
            )
        }

        return (

            <div className="container" >
                <div className="row">
                    <div className="col infoContainer">
                        <hr />
                        <div className="d-flex">
                            {showPic}
                            <div>
                                <h3>
                                    <span name="staffName" className="labels">{this.state.staff.name}</span>
                                </h3>
                                <h5>
                                    <span name="emailLabel" className="labels">Email: </span><span name="ID">{this.state.staff.email}</span>
                                </h5>
                                <h5>
                                    <span name="mobileLabel" className="labels">Mobile: </span><span name="ID">{this.state.staff.mobile}</span>
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div>
                                <h3 name="notesLabel" className="labels">Notes:</h3>
                            </div>
                            <div>
                                <h5 name="notes" className="notes">{this.state.staff.notes}</h5>
                            </div>
                            {editStaffBtn}
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default StaffListWidget;

