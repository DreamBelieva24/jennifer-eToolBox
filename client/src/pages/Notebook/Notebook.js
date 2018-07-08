import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import Toolbar from "../../components/Toolbar";
import { Button, Modal } from 'react-bootstrap';
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Notebook extends Component {

    state = {
        tasks: [],
        task: "",
        username: "",
        subscriptions: [],
        show: false,
        Subscription: "",
        name: "",
        date: ""
    };

    componentDidMount() {
        this.loadTask();
        this.getUser();
        this.loadSubscriptions();
    }

    getUser = () => {
        API.getUser()
            .then(res => {
                this.setState({
                    username: res.data.username,
                    name: res.data.name
                })
                // console.log(this.state.username);
            },
        )
    };

    loadSubscriptions = () => {
        API.getSubscriptions()
            .then(res =>
                this.setState({ subscriptions: res.data })
            )
            .catch(err => console.log(err));
    };

    loadTask = () => {
        API.getTasks()
            .then(res =>
                this.setState({ tasks: res.data })
            )
            .catch(err => console.log(err));
    };

    deleteTask = id => {
        API.deleteTask(id)
            .then(res => this.loadTask())
            .catch(err => console.log(err));
    };

    unsubscribe = id => {
        API.unsubscribe(id)
            .then(res => this.loadSubscriptions())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,

        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { name } = event.target;
        // console.log(name)
        if (this.state[name]) {
            API.saveTask({
                task: this.state[name],
                label: name,
                username: this.state.username,
                name: this.state.name,
                date: new Date(),

            })
                .then(res => this.loadTask())
                .catch(err => console.log(err));
        }
    };

    handleModalSubmit = event => {
        event.preventDefault();
        const { name } = event.target;
        if (this.state[name]) {
            API.subscribe({
                username: this.state.username,
                subscription: this.state[name]

            })
                .then(res => this.loadSubscriptions())
                .catch(err => console.log(err));
        }
    };

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleClick = event => {
        this.handleModalSubmit(event);
        this.loadSubscriptions();
    }

    handleDelete = id => {
        this.unsubscribe(id);

    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <div id="index">
                            <Nav name="Notebook" />
                                <Toolbar />
                                    <div className="row padded">
                                        <div className="yellow box padded animated bounceInLeft six twelfths gapped">
                                            <h1>My Notebook</h1>
                                    <div className="row centered">
                                        <div className="one whole padded">
                                            <List>
                                                {this.state.tasks.map(task => {
                                                    if (task.username === this.state.username && task.label === "Notes") {
                                                        return (
                                                            <ListItem key={task._id}>
                                                            
                                                                {task.task}

                                                            <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                            </ListItem>
                                                        );
                                                    }
                                                    else
                                                        return null
                                                })}
                                            </List>
                                            <form>
                                                <TextArea
                                                    value={this.state.Notes}
                                                    onChange={this.handleInputChange}
                                                    name="Notes"
                                                    placeholder="Add New Note"
                                                />
                                                <FormBtn
                                                    disabled={!(this.state.Notes)}
                                                    onClick={this.handleFormSubmit}
                                                    name="Notes"
                                                > +
                                                </FormBtn>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                    <div className="five twelfths asphalt box padded animated bounceInRight">
                                        <button className="green animated bounceInRight" onClick={this.handleShow}>Subscribe to Notebook</button>
                                            <hr></hr>
                                                <h1>Subscribed Notebooks</h1>

                                <div className="row centered">
                                    <div className="one whole padded">
                                        <List>
                                            {this.state.subscriptions.map(subscription => {
                                                if (subscription.subscription && subscription.username === this.state.username) {
                                                    return (
                                                        <div key={subscription._id}>
                                                            From: {subscription.subscription}
                                                                {this.state.tasks.map(task => {
                                                                    if (subscription.subscription === task.username && task.label === "Notes") {
                                                                        return (
                                                                            <div>
                                                                                <ListItem key={task._id}>
                                                                                    {task.task}
                                                                                </ListItem>
                                                                            </div>
                                                                        )}
                                                                    else
                                                                        return null
                                                                })}
                                                        </div>
                                                        )}
                                                else
                                                    return null
                                                }
                                            )}
                                        </List>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
             </Row>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}>
                        <h1 className="centered">Subscribe to a Notebook</h1>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <h4>Subscribe to a Notebook by entering the Notebook's code here. </h4>
                                <Input
                                    value={this.state.Subscription}
                                    onChange={this.handleInputChange}
                                    name="Subscription"
                                    placeholder="Add Code Here"
                                />
                                <FormBtn
                                    disabled={!(this.state.Subscription)}
                                    onClick={this.handleClick}
                                    name="Subscription"
                                > Submit
                                </FormBtn>
                                     <br></br>
                                        <hr></hr>
                                            Your Notebook Code: {this.state.username}
                                        <hr></hr>
                                            Your current subscriptions:
                                                <List>
                                                    {this.state.subscriptions.map(subscription => {
                                                        if (subscription.subscription && subscription.username === this.state.username) {
                                                            return (
                                                            <ListItem key={subscription._id}>
                                                                {subscription.subscription}
                                                            <DeleteBtn onClick={() => this.handleDelete(subscription._id)} />
                                                            </ListItem>
                                                            );
                                                        }
                                                        else
                                                            return null
                                                    })}
                                                </List>
                        </ Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </ Modal>
            </Container>
        );
    }
}

export default Notebook;
