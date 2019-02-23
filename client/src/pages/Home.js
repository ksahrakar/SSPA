import React, { Component } from "react";
import "../styles/style.css";
import Locations from "../components/Locations";

class Home extends Component {


    render() {
        return (
            <div className="container">
                <Locations />
            </div>
        )
    }
}

export default Home;

