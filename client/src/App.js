import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavB from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Home from "./pages/Home";
import Dog from "./pages/Dog";
import Doglist from "./pages/Doglist";
import Nomatch from "./pages/Nomatch";
import Staff from "./pages/Staff";
import StaffList from "./pages/StaffList";
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import API from "./utils/API";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      permissions: null,
      name: null
    }

  }

  componentDidMount = () => {
    this.getStaff()
  }

  updateStaff = (staffObject) => {
    this.setState(staffObject)
  }

  getStaff = () => {
    API.checkStaff()
      .then(res => {
        console.log("Get Staff Response: ")
        console.log(res.data)

        if (res.data.staff) {
          this.setState({
            loggedIn: true,
            username: res.data.staff.email,
            id: res.data.staff.id,
            permissions: res.data.staff.permissions,
            name: res.data.staff.name
          })
        } else {
          console.log("Get staff: no staff");
          sessionStorage.clear();
          this.setState({
            loggedIn: false,
            username: null,
            id: null,
            permissions: null,
            name: null,
          })
        }
      })
  }

  render() {

    return (
      <Router>
        <div>
          <Jumbotron />

          <NavB updateStaff={this.updateStaff} id={this.state.id} loggedIn={this.state.loggedIn} name={this.state.name} />

          <Switch>
            {/* LOG IN PAGE - pass updateStaff component*/}
            <Route path="/login" render={() => <LoginForm updateStaff={this.updateStaff} />} />

            {/* SIGN UP PAGE  - pass updateStaff component */}
            <Route path="/signup" render={() => <Signup signup={this.signup} updateStaff={this.updateStaff} />} />

            {/* HOME PAGE - not logged in goes to LOGIN */}
            <Route exact path="/" render={() => <Home loggedIn={this.state.loggedIn} permissions={this.state.permissions} />} />

            {/* SPECIFIC DOG - pass login and permissions */}
            <Route exact path="/dog/:id" render={({ match }) => <Dog loggedIn={this.state.loggedIn} permissions={this.state.permissions} id={match.params.id} />} />

            {/* DOG LIST - pass login and permissions */}
            <Route exact path="/doglist" render={() => <Doglist loggedIn={this.state.loggedIn} permissions={this.state.permissions} />} />

            {/* STAFF LIST - pass login and permissions */}
            <Route exact path="/stafflist" render={() => <StaffList loggedIn={this.state.loggedIn} permissions={this.state.permissions} />} />

            {/* SPECIFIC STAFF - pass login and permissions */}
            <Route exact path="/staff/:id" render={({ match }) => <Staff loggedIn={this.state.loggedIn} permissions={this.state.permissions} id={match.params.id} />} />

            {/* 404 page! */}
            <Route component={Nomatch} />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
