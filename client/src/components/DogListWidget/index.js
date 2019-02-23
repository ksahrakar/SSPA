import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import CheckoutDog from "../CheckoutDog";
import AddEditDog from "../AddEditDog";
import "../../styles/style.css"


class DogListWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs: [],
            modalShow: false,
            modalShow2: false,
            modalInfo: {
                socialization: []
            },
            inactive: false,
        };
    }

    componentDidMount() {
        this.findalldogs();
    };
    findalldogs = () => {
        API.getDogs()
            .then(res => this.setState({
                dogs: res.data
            }, () => {
                this.setState({
                    inactive: false
                })
            }))
            .catch(err => console.log(err));
    }

    findInactive = () => {
        API.getInactiveDogs()
            .then(res => this.setState({
                dogs: res.data
            }, () => {
                this.setState({
                    inactive: true
                })
            }))
            .catch(err => console.log(err));
    }

    loadModal = (dog) => {
        this.setState({ modalInfo: dog });
        this.setState({ modalShow: true })
    }

    loadModal2 = () => {
        this.setState({ modalShow2: true });
    }

    checkprogress = (soc) => {
        if (soc.done && !soc.inprogress) {
            return "success"
        } else if (!soc.done && !soc.inprogress) {
            return "danger"
        } else {
            return "warning"
        }
    }

    render() {
        let modalClose = () => {
            this.setState({ modalShow: false }, () => {
                this.findalldogs();
            });
        };
        let modalClose2 = () => {
            this.setState({ modalShow2: false }, () => {
                this.findalldogs();
            });
        };

        const isInactive = this.state.inactive;
        let button;
        if (isInactive) {
            button = <Button style={{backgroundColor:'rgb(14,166,197)',marginBottom:'10px'}} className="btn btn-lg" variant="primary" onClick={() => this.findalldogs()}>View Active</Button>;
        } else {
            button = <Button style={{backgroundColor:'rgb(14,166,197)',marginBottom:'10px'}} className="btn btn-lg" variant="primary" onClick={() => this.findInactive()}>View Inactive</Button>;
        }

        let newButtons;
        let isAdmin = sessionStorage.admin;
        if (isAdmin==="true"){
            newButtons = (
            <div className="buttonSpace">
            <Button style={{backgroundColor:'rgb(14,166,197)',marginBottom:'10px'}} className="btn btn-lg newDogBtn" variant="primary" onClick={() => this.loadModal2()}>New Dog</Button>
            <AddEditDog show={this.state.modalShow2} onHide={modalClose2}/>
            {button}
            </div>)
        } else {
            newButtons = (<div className="buttonSpace">
               {button}
            </div>)
        }

        return (
            <div className="container">
                <div className="buttonSpace">
                   {newButtons} 
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="headings">Dog</th>
                            <th scope="col" className="headings">Kennel</th>
                            <th scope="col" className="headings">Socialization Program</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dogs.map(dog => (
                            <tr key={dog._id}>
                                <th>{dog.name}</th>
                                <th>{dog.kennel}</th>
                                <th>
                                    {dog.socialization.map((soc, i) => (
                                        <Badge style={{marginRight:'5px'}}variant={this.checkprogress(soc)}> {soc.name}/{soc.duration}/{soc.ampm} </Badge>
                                    ))}
                                    <CheckoutDog show={this.state.modalShow} onHide={modalClose} props={this.state.modalInfo} />
                                </th>
                                <th> <Link to={"/dog/" + dog._id} >More</Link> </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default DogListWidget;

