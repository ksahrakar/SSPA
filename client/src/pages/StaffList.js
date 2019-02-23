import React, { Component } from "react";
import StaffListWidget from "../components/StaffListWidget";
import "../styles/style.css";


class StaffList extends Component {

    render() {
        return (
            <div className="container">
                <StaffListWidget />
            </div>
        )
    }
}

export default StaffList;