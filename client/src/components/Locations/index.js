import React, { Component } from "react";
import "../../styles/locations.css";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class Locations extends Component {
    state = {
        dogs: [],
        staff: [],
        tok:0
    }


    componentDidMount() {
        this.pullcurrentLocation();
    };

    pullcurrentLocation = () => {
        API.getDogs()
            .then(res => this.setState({
                dogs: res.data
            }))
            .catch(err => console.log(err));
        API.getAllStaff()
            .then(res =>
                this.setState({ staff: res.data })
            ).catch(err => console.log(err));
    };

    // Reset socializations to done=false every day at midnight
    resetSocDone = (dogs) => {
        for (let i = 0; i < dogs.length; i++) {
            for (let s = 0; s < dogs[i].socialization.length; s++) {
                let now = new Date();
                let lastSoc = new Date(dogs[i].checkout);
                if ((now.getDay() !== lastSoc.getDay()) && (dogs[i].socialization[s].done === true)) {
                    this.handleSocializationUpdate(s, i)
                }
            }
        }
        this.pullcurrentLocation()
    }

    handleSocializationUpdate = (indexSoc, indexDog) => {
        const newSocialization = this.state.dogs[indexDog].socialization.map((soc, sidx) => {
            if (indexSoc !== sidx) return soc;
            return { ...soc, done: false };
        });
        let newState = Object.assign({}, this.state);
        newState.dogs[indexDog].socialization = newSocialization;
        this.setState({ newState }, () => {
            this.updateDog(this.state.dogs[indexDog])
        });
    }

    updateDog = (dog) => {
        API.updateDog(dog)
            .then(this.pullcurrentLocation()).catch(err => console.log(err));
    }

    checkfordata = (data) => {
        if (data.length <= 0) {
            return false
        } else {
            return true
        }
    };

    checkstatus = (staff) => {
        if (staff.available) {
            return <span className="available-badge badge badge-success"> YES </span>
        } else {
            return <span className="available-badge badge badge-danger"> {staff.location ? staff.location : "?"} </span>
        }
    };

    getCheckout = (dog) => {
        return dog.checkout;
    };

    checkprogress = (soc, dog) => {
        let socPlanTime, checkoutTime, checkedOut;
        for (let i = 0; i < soc.length; i++) {
            if (soc[i].inprogress) {
                socPlanTime = parseInt(soc[i].duration); //returns an integer(works)
                checkoutTime = true;
            }
            if (checkoutTime) {
                checkedOut = new Date(this.getCheckout(dog));
            }
        }
        var diff = Math.floor(Math.abs(new Date() - new Date(checkedOut)) / 60000);
        //this.setState({tok:diff});
        var minutes = socPlanTime - diff;

        if (minutes > 0) {
            return <span className="badge badge-warning">{Math.abs(minutes)}</span>
        } else {
            return <span className="badge badge-success">✓</span>
        }

    }

    overallProgress = (soc) => {
        let notdone = [];
        for (let i = 0; i < soc.length; i++) {
            if (soc[i].done !== true) {
                notdone.push(soc[i]);
            }
        }
        if (notdone.length <= 0) {
            return <span className="badge badge-success">✓</span>
        } else {
            return <span className="badge badge-danger">X</span>
        }
    }

    render() {
        //create variables to filter by location
        let kennel = this.state.dogs.filter(dog => dog.location === "Kennel");
        let offCampus = this.state.dogs.filter(dog => dog.location === "Off Campus");
        let theTrack = this.state.dogs.filter(dog => dog.location === "The Track");
        let eastGroup = this.state.dogs.filter(dog => dog.location === "East Group Area");
        let northGroup = this.state.dogs.filter(dog => dog.location === "North Group Area");
        let northConcrete = this.state.dogs.filter(dog => dog.location === "North Concrete Area");
        let dirt = this.state.dogs.filter(dog => dog.location === "The Dirt");
        let grassy1 = this.state.dogs.filter(dog => dog.location === "Grassy 1");
        let grassy2 = this.state.dogs.filter(dog => dog.location === "Grassy 2");
        let grassy3 = this.state.dogs.filter(dog => dog.location === "Grassy 3");
        let southConcrete = this.state.dogs.filter(dog => dog.location === "South Concrete Area");
        let activeStaff = this.state.staff.filter(staff => staff.active === true);

        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-sm-6 " >

                        {/* active staff */}
                        <div className="box-location staffBox">
                            <h3><strong>CURRENT STAFF LIST</strong></h3>
                            {this.checkfordata(activeStaff) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Staff</th>
                                            <th className="table-header">Avail?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeStaff.map(staff => (
                                            <tr key={staff._id}>
                                                <th><Link to={"/staff/" + staff._id}>{staff.name}</Link></th>
                                                <th>{this.checkstatus(staff)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO CURRENT STAFF"}
                        </div>
                        
                        {/* Refresh button */}
                        <Button style={{backgroundColor:'rgb(14,166,197)',padding:'5px'}} size="lg" className="btn" bg="dark" variant="warning" onClick={() => this.resetSocDone(this.state.dogs)} block> Refresh Data
                        </Button>

                        {/* South Concrete Area */}
                        <div className="box-location">
                            <h3><strong>South Concrete Area</strong></h3>
                            {this.checkfordata(southConcrete) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {southConcrete.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                        {/* North Concrete */}
                        <div className="box-location">
                            <h3><strong>North Concrete</strong></h3>
                            {this.checkfordata(northConcrete) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {northConcrete.map(dog => (
                                            <tr key={dog._id}>

                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                        {/* The Track */}
                        <div className="box-location">
                            <h3><strong>The Track</strong></h3>
                            {this.checkfordata(theTrack) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {theTrack.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                        {/* Off-Campus */}
                        <div className="box-location">
                            <h3><strong>Off Campus</strong></h3>
                            {this.checkfordata(offCampus) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {offCampus.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        {/* Kennel */}
                        <div className="box-location kennel">
                            <h3><strong>KENNEL</strong></h3>
                            {/* {this.resetSocDone(this.state.dogs.socialization)}; */}
                            {this.checkfordata(kennel) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kennel.map(dog => (

                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>

                                                <th>{this.overallProgress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                    {/* North Group Area */}
                        <div className="box-location">
                            <h3><strong>North Group Area</strong></h3>
                            {this.checkfordata(northGroup) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {northGroup.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                        
                        {/* The Dirt */}
                        <div className="box-location">
                            <h3><strong>The Dirt</strong></h3>
                            {this.checkfordata(dirt) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dirt.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                        {/* East Group Area */}
                        <div className="box-location">
                            <h3><strong>East Group Area</strong></h3>
                            {this.checkfordata(eastGroup) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eastGroup.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        {/* Grassy 3 */}
                        <div className="box-location">
                            <h3><strong>Grassy 3</strong></h3>
                            {this.checkfordata(grassy3) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grassy3.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                        {/* Grassy 2 */}
                        <div className="box-location">
                            <h3><strong>Grassy 2</strong></h3>
                            {this.checkfordata(grassy2) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grassy2.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                        {/* Grassy 1 */}
                        <div className="box-location">
                            <h3><strong>Grassy 1</strong></h3>
                            {this.checkfordata(grassy1) ?
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Dog</th>
                                            <th className="table-header">Progress</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grassy1.map(dog => (
                                            <tr key={dog._id}>
                                                <th><Link to={"/dog/" + dog._id}>{dog.name}</Link></th>
                                                <th>{this.checkprogress(dog.socialization, dog)}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                : "NO DOGS"}
                        </div>
                        
                    </div>
                </div>
            </div>


        )
    }

}

export default Locations;

