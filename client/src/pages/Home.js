import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import "../styles/style.css";
import Locations from "../components/Locations";

class Home extends Component {
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
                    <Locations permissions={this.props.permissions} />
                </div>
            )
        }
    }
}

export default Home;

