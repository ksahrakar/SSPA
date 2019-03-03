import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
//import CheckoutDog from "../CheckoutDog";
import AddEditDog from "../AddEditDog";
import "../../styles/style.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



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
            permissions: null
        };
    }

    componentDidMount() {
        this.findalldogs();
        this.setState({
            permissions: this.props.permissions
        })
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

    handlefilterChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState ({
            [name]: value
        })
    };

    render() {
        //var filteredPlayStyle;
        
        //const APG = this.state.dogs.filter(dog => dog.playStyle === (("PG-RR") || ("PG-GentleRR") || ("PG-GD") || ("W-PG")));
        const PGRR = this.state.dogs.filter(dog => dog.playStyle === "PG-RR");
        const PGGRR = this.state.dogs.filter(dog => dog.playStyle === "PG-GentleRR");
        const PGGD = this.state.dogs.filter(dog => dog.playStyle === "PG-GD");
        //const AW = this.state.dogs.filter(dog => dog.playStyle === "W-PG" || "W-1" || "W-2" || "W-3" || "W-4");
        const WPG = this.state.dogs.filter(dog => dog.playStyle === "W-PG");
        const W1 = this.state.dogs.filter(dog => dog.playStyle === "W-1");
        const W2 = this.state.dogs.filter(dog => dog.playStyle === "W-2");
        const W3 = this.state.dogs.filter(dog => dog.playStyle === "W-3");
        const W4 = this.state.dogs.filter(dog => dog.playStyle === "W-4");
        const KV = this.state.dogs.filter(dog => dog.playStyle === "KV");
        const ALL = this.state.dogs;

        // switch (filterBy) {
        //     case "PGRR":filteredPlayStyle=PGRR; break;
        //     case "PGGRR":filteredPlayStyle=PGGRR;break;
        //     case "PGGD":filteredPlayStyle=PGGD;break;
        //     case "WPG":filteredPlayStyle=WPG;break;
        //     case "W1":filteredPlayStyle=W1;break;
        //     case "W2":filteredPlayStyle=W2;break;
        //     case "W3":filteredPlayStyle=W3;break;
        //     case "W4":filteredPlayStyle=W4;break;
        //     case "KV":filteredPlayStyle=KV;break;
        //     default: filteredPlayStyle=ALL;break;
        // }

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
        
        let ddbutton = 
        <div>
        <DropdownButton
        title={"Filter by Playstyle"}
        variant={"info"}
        id={`dropdown-variants-info`}
        key={"Info"}
        size="lg"
        name="filterBy"
        >
            <Dropdown.Item eventKey="11" value="APG">All Playgroup Dogs</Dropdown.Item>
            <Dropdown.Item eventKey="2" value="PGRR">PG-RR</Dropdown.Item>
            <Dropdown.Item eventKey="3" value="PGGRR">PG-GentleRR</Dropdown.Item>
            <Dropdown.Item eventKey="4" value="PGGD">PG-GD</Dropdown.Item>
            <Dropdown.Item eventKey="12" value="AW">All Walk Dogs</Dropdown.Item>
            <Dropdown.Item eventKey="5" value="WPG">W-PG</Dropdown.Item>
            <Dropdown.Item eventKey="6" value="W1">W-1</Dropdown.Item>
            <Dropdown.Item eventKey="7" value="W2">W-2</Dropdown.Item>
            <Dropdown.Item eventKey="8" value="W3">W-3</Dropdown.Item>
            <Dropdown.Item eventKey="9" value="W4">W-4</Dropdown.Item>
            <Dropdown.Item eventKey="10" value="KV">KV</Dropdown.Item>
            <Dropdown.Item eventKey="1" value="ALL" active>All Dogs</Dropdown.Item>
        </DropdownButton>
        </div>;

        const isInactive = this.state.inactive;
        var button;
        if (isInactive) {
            button = <Button style={{ backgroundColor: 'rgb(14,166,197)', marginBottom: '10px' }} className="btn btn-lg" variant="primary" onClick={() => this.findalldogs()}>View Active</Button>;
        } else {
            button = <Button style={{ backgroundColor: 'rgb(14,166,197)', marginBottom: '10px' }} className="btn btn-lg" variant="primary" onClick={() => this.findInactive()}>View Inactive</Button>;

        }

        let newButtons;
        let permissions = this.state.permissions;
        if (permissions !== "user") {
            newButtons = (
                <div className="buttonSpace">
                    <Button style={{ backgroundColor: 'rgb(14,166,197)', marginBottom: '10px' }} className="btn btn-lg newDogBtn" variant="primary" onClick={() => this.loadModal2()}>New Dog</Button>
                    <AddEditDog show={this.state.modalShow2} onHide={modalClose2} />
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
                            <th scope="col" className="headings">Playstyle</th>
                            <th scope="col" className="headings">Socialization Program</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ALL.map(dog => (
                            <tr key={dog._id}>
                                <th>{dog.name}</th>
                                <th>{dog.kennel}</th>
                                <th>{dog.playStyle}</th>
                                <th>
                                    {dog.socialization.map((soc, i) => (
                                        <Badge style={{ marginRight: '5px' }} variant={this.checkprogress(soc)}> {soc.name}/{soc.duration}/{soc.ampm} </Badge>
                                    ))}
                                    {/* <CheckoutDog show={this.state.modalShow} onHide={modalClose} props={this.state.modalInfo} /> */}
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

