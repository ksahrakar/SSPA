import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from "../../utils/API";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";



class NavB extends Component {
    constructor() {
        super()
        this.state = {

        }
    };

    logout = (event) => {
        event.preventDefault()
        API.logout().then(res => {
            if (res.status === 200) {
                this.updateUserLogout(this.props.id)
                sessionStorage.clear();

                this.props.updateStaff({
                    loggedIn: false,
                    username: null,
                    id: null,
                    permissions: null,
                    name: null
                })
            }
        }).then(window.location.replace("/login")).catch(error => {
            console.log('Logout error...' + error)
        })
    }

    updateUserLogout = (id) => {
        API.updateStaffLogout(id).then().catch(err => console.log(err));
    }



    render() {
        const loggedIn = this.props.loggedIn;
        const name = this.props.name;

        console.log('navbar render, props: ')
        console.log(this.props);

        if (loggedIn === true) {
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <div className="container" style={{ paddingRight: "30px", paddingLeft: "30px" }}>
                        <Navbar.Brand><Link to="/" style={{ fontSize: "20px", Color: 'rgb(14,166,197)', marginRight: '5px' }}> SSPA Socialization</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto" >
                                <NavItem style={{ padding: '15px' }}><Link to="/doglist">All Dogs</Link></NavItem>
                                <NavItem style={{ padding: '15px' }}><Link to="/stafflist">All Staff</Link></NavItem>
                            </Nav>
                            <Nav className="m1-auto" >
                                <Navbar.Text> Hello {name}  </Navbar.Text>
                                <Button style={{ backgroundColor: 'rgb(14,166,197)', padding: '5px', width: "100px" }} className="btn" bg="dark" variant="warning" onClick={this.logout} block> Logout</Button>

                            </Nav>
                        </Navbar.Collapse>

                    </div>
                </Navbar>

            )
        } else {
            return (
                <Navbar bg="dark" variant="dark">
                    <span style={{ fontSize: "20px" }} className="introLogin">Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to use the SSPA-Socialization App</span>
                </Navbar>
            );
        }
    }
}




export default NavB;


