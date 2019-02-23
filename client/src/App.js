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
      id: null
    }

    this.getStaff = this.getStaff.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateStaff = this.updateStaff.bind(this)
  }

  componentDidMount() {
    this.getStaff()
  }

  updateStaff(staffObject) {
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
            id: res.data.staff.id
          })
        } else {
          console.log("Get staff: no staff");
          sessionStorage.clear();
          this.setState({
            loggedIn: false,
            username: null,
            id: null
          })

        }

      })
  }

  render() {
    if (this.state.loggedIn !== true) {
      return (
        <Router>
          <div>
            <Jumbotron />
            <NavB updateStaff={this.updateStaff} id={this.state.id} loggedIn={this.state.loggedIn} />
            <Switch>
              <Route path="/login" render={() => <LoginForm updateStaff={this.updateStaff} />} />
              <Route path="/signup" render={() => <Signup signup={this.signup} updateStaff={this.updateStaff} />} />
              <Route exact path="/" render={() => <LoginForm updateStaff={this.updateStaff} />} />
              <Route component={Nomatch} />
            </Switch>
          </div>
        </Router>
      )
    } else {
      return (
        <Router>
          <div>
            <Jumbotron />
            <NavB updateStaff={this.updateStaff} id={this.state.id} loggedIn={this.state.loggedIn} />
            <Switch>
              <Route path="/login" render={() => <LoginForm updateStaff={this.updateStaff} />} />
              <Route path="/signup" render={() => <Signup signup={this.signup} />} />
                <Route exact path="/" component={Home} />
                <Route exact path="/dog/:id" component={Dog} />
                <Route exact path="/doglist" component={Doglist} />
                <Route exact path="/stafflist" component={StaffList} />
                <Route exact path="/staff/:id" component={Staff} />
                <Route component={Nomatch} />
            </Switch>
          </div>
        </Router>
      )
    }
  }
}

export default App;
