import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import StaffWidget from "../components/StaffWidget";
import "../styles/style.css";

class Staff extends Component {
    constructor() {
        super()
        this.state = {
            redirectTo: null
        }
    };

    componentDidMount = () => {
        const loggedIn = this.props.loggedIn
        if (loggedIn !== true) {
            this.setState({
                redirectTo: "/login"
            });
        }
    }


    render() {
        const permissions = this.props.permissions;
        const id = this.props.id;

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="container">
                    <StaffWidget props={id} permissions={permissions} />
                </div>
            )
        }
    }
}

export default Staff;

