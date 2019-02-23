import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import API from "../utils/API";
import { Card, InputGroup, FormControl, Button } from "react-bootstrap";



class SignupForm extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            name: "",
            confirmPassword: '',
            redirectTo: "",
            errorMessage: null
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let signupstaff = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        if (this.state.name && this.state.email && this.state.password) {
            API.signup(signupstaff).then(res => {
                if (!res.data.errmsg) {
                    this.setState({
                        //redirect to login page
                        redirectTo: '/login'
                    })
                } else {
                    this.setState({
                        errorMessage: "Email Already Taken."
                    })

                }
            }).catch(error => {
                this.setState({
                    errorMessage: "Sign Up Error"
                })
                console.log(error)
            })
        } else {
            this.setState({
                errorMessage: "Please fill out whole sign up form."
            })
        }
    }


    render() {
        let errorMessage;

        if (this.state.errorMessage) {
            errorMessage = <div className="alert alert-warning" role="alert"> {this.state.errorMessage} </div>
        }

        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className="container">
                    <br />
                    <Card bg="dark" className="text-white">
                        <Card.Title style={{ fontSize: '24px', textAlign: 'center' }}>Sign-Up</Card.Title>
                        <form className="form-horizontal">
                            {errorMessage}
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="email">Name</label>
                                </div>
                                <div >
                                    <InputGroup className="col-9 col-mr-auto">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroup-sizing-lg">Name</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-lg"
                                            className="form-input"
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name"
                                            value={this.state.name}
                                            onChange={this.handleChange} />
                                    </InputGroup>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="email">Email</label>
                                </div>
                                <div >
                                    <InputGroup className="col-9 col-mr-auto">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroup-sizing-lg">E-mail</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-lg"
                                            className="form-input"
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="someone@domain.com"
                                            value={this.state.email}
                                            onChange={this.handleChange} />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="password">Password: </label>
                                </div>
                                <div>
                                    <InputGroup className="col-9 col-mr-auto">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroup-sizing-lg">Password</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            aria-label="Default"
                                            aria-describedby="inputGroup-sizing-lg"
                                            className="form-input"
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="password"
                                            value={this.state.password}
                                            onChange={this.handleChange} />
                                    </InputGroup>
                                </div>
                            </div>
                            <div className="form-group">
                                <Button
                                    className="btn col-2 col-mr-auto"
                                    style={{ backgroundColor: 'rgb(14,166,197)', margin: '20px', textAlign: 'center' }}
                                    onClick={this.handleSubmit}
                                    type="submit">Sign-Up</Button>
                                <Link to="/login">Login</Link>
                            </div>
                        </form>
                    </Card>
                </div>
            )
        }
    }
}

export default SignupForm