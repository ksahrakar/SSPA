import React, { Component } from "react";
import "../../styles/style.css";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router';

class StaffForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            pic: "",
            email: "",
            mobile: "",
            notes: "",
            redirect: false,
            isChecked: false
        };
    }

    componentDidMount() {
        this.loadState(this.props.staff)
    }

    loadState = data => {
        this.setState({ ...data }, () => {
            this.state.admin ? this.setState({ isChecked: true }) : this.setState({ isChecked: false })
        })
    }

    updateMainState = () => {
        this.props.update(this.state);
    }

    deleteStaff = (id) => {
        API.deleteStaff(id)
            .then(this.setState({ redirect: true }))
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }, () => {
            this.updateMainState();
        });
    };

    handleCheckbox = event => {
        const name = event.target.name;

        this.setState({ isChecked: event.target.checked }, () => {
            this.setState({
                [name]: this.state.isChecked
            }, () => {
                this.updateMainState();
            });
        });

    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to="/stafflist" />;
        }

        return (

            <div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                    </div>
                    <input name="name" value={this.state.name} className="form-control" onChange={this.handleInputChange} type="text" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">pic URL</span>
                    </div>
                    <input name="pic" value={this.state.pic} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">email</span>
                    </div>
                    <input name="email" value={this.state.email} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Mobile</span>
                    </div>
                    <input name="mobile" value={this.state.mobile} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Notes</span>
                    </div>
                    <input name="notes" value={this.state.notes} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div>
                    <input
                        type="checkbox"
                        name="admin"
                        value={this.state.isChecked}
                        checked={this.state.isChecked}
                        onChange={this.handleCheckbox} />
                    ADMINISTRATOR
                </div>
                <hr />
                <Button className="btn btn-danger" onClick={() => this.deleteStaff(this.state._id)}>Delete Staff</Button>
            </div>

        );
    }
}

export default StaffForm;