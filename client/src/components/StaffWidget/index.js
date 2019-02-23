import React, { Component } from "react";
import "../../styles/style.css";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import AddEditStaff from "../AddEditStaff";


class StaffListWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            staff: {}
        };
    };

    componentDidMount() {
        this.findStaff()
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
        if (this.state.staff.pic){
            showPic = (
                <img src={this.state.staff.pic} alt="staff pic" className="img-thumbnail" />
            )
        } else {
            showPic = (
                <img src="https://i.postimg.cc/3RmkQzvB/Someone.jpg" alt="staff pic" className="img-thumbnail" />
            )
        }

        let editStaffBtn;
        let isAdmin = sessionStorage.admin;
        if (isAdmin === "true") {
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
                            {/* <img src={this.state.staff.pic} alt="staff pic" className="img-thumbnail" /> */}
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
                    {/* <div class="col socContainer">
                        <h3 name="shiftsLabel">Shifts</h3>
                        
                        <table name="shifts" className="table table-sm">
                            <thead>
                            <tr>
                                <th scope="col" >Date</th>
                                <th scope="col" >Hours</th>
                            </tr>
                            </thead>
                            {/*Map through array of shifts*/}
                    {/* <tbody>
                                {this.state.staff.worked.map(item=>
                                    <tr key={this.state.staff._id} className="table-active">
                                        <td>{moment(item[0]).format("MM DD YYYY")}</td>
                                        <td>{item[1]}</td>
                                    </tr>
                                )} */}
                    {/*Empty row to add new shift*/}
                    {/* <tr className="table-info">
                                <td>
                                    <div className="col">
                                    <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                </td>
                                <td>
                                    <div className="col">
                                    <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                </td>
                                <div className="col">
                                    <button className="btn btn-sm" name="addSocPlan">Add</button>
                                </div>
                            </tr>
                            </tbody>
                        </table>
                    </div> */}
                </div>
            </div>
        )
    }


}

export default StaffListWidget;

