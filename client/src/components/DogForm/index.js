import React, { Component } from "react";
import "../../styles/style.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import API from "../../utils/API";
import { Redirect } from 'react-router';
import Form from "react-bootstrap/Form";

class DogForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            pic: "",
            kennel: 0,
            shelterID: "",
            intakeDate: "",
            description: "",
            playStyle: "",
            notes: "",
            socialization: [],
            isChecked: true,
            redirect: false
        };

    }

    componentDidMount() {
        this.loadState(this.props.dog);
    }

    loadState = data => {
        this.setState({ ...data }, () => {
            this.state.active ? this.setState({ isChecked: true }) : this.setState({ isChecked: false })
        })
    }

    updateMainState = () => {
        this.props.update(this.state);
    }

    handleCheckboxChange = event => {
        const name = event.target.name;

        this.setState({ isChecked: event.target.checked }, () => {
            this.setState({
                [name]: this.state.isChecked
            }, () => {
                this.updateMainState();
            });
        });

    }

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        }, () => {
            this.updateMainState();
        });
    };

    handleSocializationNameChange = idx => evt => {
        const newSocialization = this.state.socialization.map((soc, sidx) => {
            if (idx !== sidx) return soc;
            return { ...soc, name: evt.target.value };
        });

        this.setState({
            socialization: newSocialization
        }, () => {
            this.updateMainState();
        });

    };

    handleSocializationDurationChange = idx => evt => {
        const newSocialization = this.state.socialization.map((soc, sidx) => {
            if (idx !== sidx) return soc;
            return { ...soc, duration: evt.target.value };
        });

        this.setState({
            socialization: newSocialization
        }, () => {
            this.updateMainState();
        });

    };

    handleSocializationAmpmChange = idx => evt => {
        const newSocialization = this.state.socialization.map((soc, sidx) => {
            if (idx !== sidx) return soc;
            return { ...soc, ampm: evt.target.value };
        });

        this.setState({
            socialization: newSocialization
        }, () => {
            this.updateMainState();
        });

    };

    handleDeleteSocialization = (index) => {

        var newsoc = [...this.state.socialization];
        if (index !== -1) {
            newsoc.splice(index, 1);
            this.setState({ socialization: newsoc }, () => {
                this.updateMainState();
            });
        }

    }

    handleAddSocialization = () => {
        this.setState({
            socialization: this.state.socialization.concat([{ name: "", duration: 0, ampm: "" }])
        });
    };

    deleteDog = (id) => {
        API.deleteDog(id)
            .then(this.setState({ redirect: true }))
            .catch(err => console.log(err));
    }


    render() {

        if (this.state.redirect) {
            return <Redirect push to="/doglist" />;
        }


        return (

            <div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                    </div>
                    <input name="name" value={this.state.name} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">pic URL</span>
                    </div>
                    <input name="pic" value={this.state.pic} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Kennel</span>
                    </div>
                    <input name="kennel" value={this.state.kennel} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Shelter ID</span>
                    </div>
                    <input name="shelterID" value={this.state.shelterID} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Intake Date</span>
                    </div>
                    <input name="intakeDate" value={this.state.intakeDate} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Description</span>
                    </div>
                    <input name="description" value={this.state.description} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" >Playstyle</label>
                    </div>
                    <Form.Control as="select" name="playStyle" onChange={this.handleInputChange}>
                        <option value="">{this.state.playStyle}</option>
                        <option value="PG-RR" >Playgroup - Rough/Rowdy</option>
                        <option value="PG-GentleRR" >Playgroup - Gentle Rough/Rowdy</option>
                        <option value="PG-GD" >Playgroup - Gentle/Dainty</option>
                        <option value="W-PG" >Walk/Playgroup</option>
                        <option value="W1" >Walk Only- Level 1</option>
                        <option value="W2" >Walk Only- Level 2</option>
                        <option value="W3" >Walk Only- Level 3</option>
                        <option value="W4" >Walk Only- Level 4</option>
                        <option value="KV" >Kennel Visit Only</option>
                    </Form.Control>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Notes</span>
                    </div>
                    <input name="notes" value={this.state.notes} onChange={this.handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <div>
                    <h4>Socialization Plan</h4>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th scope="col" className="socTableCell">Type</th>
                                <th scope="col" className="socTableCell">Time</th>
                                <th scope="col" className="socTableCell">When - AM/PM</th>
                                <th scope="col" className="socTableCell">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.socialization.map((soc, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder={`Socialization #${idx + 1} name`}
                                            value={soc.name}
                                            className="socTableCell"
                                            onChange={this.handleSocializationNameChange(idx)}
                                        /></td>
                                    <td>
                                        <input
                                            type="number"
                                            placeholder={`Socialization #${idx + 1} duration`}
                                            value={soc.duration}
                                            className="socTableCell"
                                            onChange={this.handleSocializationDurationChange(idx)}
                                        /></td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder={`Socialization #${idx + 1} AM or PM?`}
                                            value={soc.ampm}
                                            className="socTableCell"
                                            onChange={this.handleSocializationAmpmChange(idx)}
                                        /></td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => this.handleDeleteSocialization(idx)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <button
                        type="button"
                        onClick={this.handleAddSocialization}
                        className="small" >Add Socialization</button>
                </div>
                <hr />
                <div>
                    <input
                        type="checkbox"
                        name="active"
                        value={this.state.isChecked}
                        checked={this.state.isChecked}
                        onChange={this.handleCheckboxChange} />
                    ACTIVE
                </div>
                <hr />
                <Button className="btn btn-danger" onClick={() => this.deleteDog(this.state._id)}>Delete Dog</Button>
            </div>


        );
    }
}
export default DogForm;