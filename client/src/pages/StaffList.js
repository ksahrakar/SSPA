import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import StaffListWidget from "../components/StaffListWidget";
import "../styles/style.css";


class StaffList extends Component {
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
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="container">
                    <StaffListWidget permissions={this.props.permissions} />
                </div>
            )
        }
    }
}

export default StaffList;