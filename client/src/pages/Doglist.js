import React, { Component } from "react";
import DogListWidget from "../components/DogListWidget";
import "../styles/style.css";



class DogList extends Component {


    render() {
        return (
            <div className="container">
                <DogListWidget />
            </div>
        )
    }
}

export default DogList;

