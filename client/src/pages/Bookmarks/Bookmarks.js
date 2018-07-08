import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import Toolbar from "../../components/Toolbar";
import Unstarred from "../../components/Unstarred";
import Starred from "../../components/Starred";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import "./Bookmarks.css";

class Bookmarks extends Component {
    state = {
        tasks: [],
        task: "",
        username: "",
        Bookmark1: "",
        Bookmark2: "",
        completed: "",
        count: ""
    };

    componentDidMount() {
        this.loadTask();
        this.getUser();
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

    checkTask = id => {

        API.updateTask(id, 0)
            .then(res => this.loadTask())
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
        console.log(name)
        if (this.state[name]) {
            API.saveTask({
                task: this.state[name],
                label: name,
                completed: false,
                username: this.state.username

            })
                .then(res => this.loadTask())
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <div id="index">
                            <Nav name="Bookmarks" />
                                <Toolbar />
                                    <div className="row align-center">
                                        <div className="five asphalt box twelfths skip-one gapped animated bounceInLeft">
                                            <div className="align-left">
                                                <h1 className="align-center">Group One</h1>
                                            <div className="row centered">
                                            <List>
                                                {this.state.tasks.map(task => {
                                                    if (task.username === this.state.username && task.label === "Bookmark1" && (task.completed) % 2 === 1) {
                                                        return (
                                                            <ListItem key={task._id}>
                                                            <Starred onClick={() => this.checkTask(task._id)} />
                                                                <a href={task.task} target="_blank">
                                                                    {task.task}
                                                                </a>&nbsp;
                                                                <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                            </ListItem>
                                                        );
                                                    }
                                                    else    
                                                        return null
                                                })}
                                                {this.state.tasks.map(task => {
                                                    if (task.username === this.state.username && task.label === "Bookmark1" && (task.completed) % 2 === 0) {
                                                        return (
                                                            <ListItem key={task._id}>
                                                            <Unstarred onClick={() => this.checkTask(task._id)} /> 
                                                                <a href={task.task} target="_blank">
                                                                    {task.task}
                                                                </a>
                                                                <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                            </ListItem>
                                                        );
                                                    }
                                                    else    
                                                        return null
                                                })}
                                            </List>
                                            </div>
                                            <br></br>
                                            <form>
                                                <Input
                                                    value={this.state.Bookmark1}
                                                    onChange={this.handleInputChange}
                                                    name="Bookmark1"
                                                    placeholder="Add New Bookmark"
                                                />
                                                <FormBtn
                                                    disabled={!(this.state.Bookmark1)}
                                                    onClick={this.handleFormSubmit}
                                                    name="Bookmark1"
                                                > +
                                                </FormBtn>
                                            </form>
                                        </div>
                                </div>
                                <div className="red box five twelfths animated bounceInRight gapped">
                                    <div className="align-left">
                                        <h1 className="align-center">Group Two</h1>
                                        <div className="row centered">
                                        <List>
                                                {this.state.tasks.map(task => {
                                                    if (task.username === this.state.username && task.label === "Bookmark2" && (task.completed) % 2 === 1) {
                                                        return (
                                                            <ListItem key={task._id}>
                                                            <Starred onClick={() => this.checkTask(task._id)} /> 
                                                                <a href={task.task} target="_blank">
                                                                    {task.task}
                                                                </a>
                                                                <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                            </ListItem>
                                                        );
                                                    }
                                                    else    
                                                        return null
                                                })}
                                                {this.state.tasks.map(task => {
                                                    if (task.username === this.state.username && task.label === "Bookmark2" && (task.completed) % 2 === 0) {
                                                        return (
                                                            <ListItem key={task._id}>
                                                            <Unstarred onClick={() => this.checkTask(task._id)} /> 
                                                                <a href={task.task} target="_blank">
                                                                    {task.task}
                                                                </a>
                                                                <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                            </ListItem>
                                                        );
                                                    }
                                                    else    
                                                        return null
                                                })}
                                            </List>
                                            </div>
                                            <br></br>
                                            <form>
                                                <Input
                                                    value={this.state.Bookmark2}
                                                    onChange={this.handleInputChange}
                                                    name="Bookmark2"
                                                    placeholder="Add New Bookmark"
                                                />
                                                <FormBtn
                                                    disabled={!(this.state.Bookmark2)}
                                                    onClick={this.handleFormSubmit}
                                                    name="Bookmark2"
                                                > +
                                                </FormBtn>
                                            </form>
                                            
                                    </div>
                                </div>
                            </div>

                        </div>



                        
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Bookmarks;
