import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import DogWidget from "../components/DogWidget";
import "../styles/style.css";

class Dog extends Component {
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
        const id = this.props.id

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="container">
                    <DogWidget props={id} permissions={permissions} />
                </div>
            )
        }
    }
}

export default Dog;

