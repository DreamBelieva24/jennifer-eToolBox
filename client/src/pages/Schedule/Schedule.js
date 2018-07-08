import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Nav from "../../components/Nav";
import Toolbar from "../../components/Toolbar";
import Completed from "../../components/Completed";
import "./Schedule.css";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Checkbox from "../../components/Checkbox/Checkbox";

class Schedule extends Component {
    state = {
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Weekend: "",
        DoOnce: "",
        tasks: [],
        task: "",
        label: "",
        completed: "",
        username: "",
        count: ""
    };

    componentDidMount() {
        this.loadTask();
        this.getUser();
    }

    getUser = () => {
        API.getUser()
            .then(res => {
                this.setState({ username: res.data.username })
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
        // console.log(name)
        if (this.state[name]) {
            API.saveTask({
                task: this.state[name],
                label: name,
                completed: false,
                username: this.state.username,
                count: 0
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
                        <div id="container">
                            <div id="index">
                                <Nav name="Schedule" />
                                    <Toolbar />
                                        <div className="row align-center double-padded">
                                            <div className="nine twelfths">
                                                <div className="asphalt box align-center double-padded animated bounceInLeft">
                                                    <h1>Do Weekly</h1>
                                                        <div className="row align-left centered">
                                                            <div className="yellow box four twelfths" id="day" >
                                                                <h2 className="align-center"> Monday </h2>
                                                                    <List>
                                                                        {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Monday" && (task.completed) % 2 === 0) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Checkbox onClick={() => this.checkTask(task._id)} /> 
                                                                                            {task.task}
                                                                                        <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                    );
                                                                                }
                                                                            else
                                                                                return null
                                                                        })}
                                                                        {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Monday" && (task.completed) % 2 === 1) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Completed onClick={() => this.checkTask(task._id)} /> 
                                                                                            <strike>{task.task}</strike>
                                                                                    <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                      );
                                                                                    }
                                                                                else
                                                                                    return null
                                                                            })}
                                                                        </List>
                                                                    <form>
                                                                        <Input
                                                                            value={this.state.Monday}
                                                                            onChange={this.handleInputChange}
                                                                            name="Monday"
                                                                            placeholder="Add New Task"
                                                                        />
                                                                        <FormBtn
                                                                            disabled={!(this.state.Monday)}
                                                                            onClick={this.handleFormSubmit}
                                                                            name="Monday"
                                                                        > +
                                                                        </FormBtn>
                                                                    </form>
                                                                </div>
                                                            <div className="yellow box four twelfths holder" id="day">
                                                                <h2 className="align-center">Tuesday</h2>
                                                                    <List>
                                                                        {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Tuesday" && (task.completed) % 2 === 0) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Checkbox onClick={() => this.checkTask(task._id)} /> 
                                                                                            {task.task}
                                                                                        <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                    );
                                                                                }
                                                                            else
                                                                                return null
                                                                        })}
                                                                    {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Tuesday" && (task.completed) % 2 === 1) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Completed onClick={() => this.checkTask(task._id)} /> 
                                                                                            <strike>{task.task}</strike>
                                                                                    <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                      );
                                                                                    }
                                                                                else
                                                                                    return null
                                                                            })}
                                                                        </List>
                                                                    <form>
                                                                        <Input
                                                                            value={this.state.Tuesday}
                                                                            onChange={this.handleInputChange}
                                                                            name="Tuesday"
                                                                            placeholder="Add New Task"
                                                                        />
                                                                        <FormBtn
                                                                            disabled={!(this.state.Tuesday)}
                                                                            onClick={this.handleFormSubmit}
                                                                            name="Tuesday"
                                                                        > +
                                                                        </FormBtn>
                                                                    </form>
                                                                </div>
                                                            <div className="yellow box four twelfths holder" id="day">
                                                                <h2 className="align-center">Wednesday </h2>
                                                                    <List>
                                                                        {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Wednesday" && (task.completed) % 2 === 0) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Checkbox onClick={() => this.checkTask(task._id)} /> 
                                                                                            {task.task}
                                                                                        <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                    );
                                                                                }
                                                                            else
                                                                                return null
                                                                            })}
                                                                    {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Wednesday" && (task.completed) % 2 === 1) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Completed onClick={() => this.checkTask(task._id)} /> 
                                                                                            <strike>{task.task}</strike>
                                                                                    <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                      );
                                                                                    }
                                                                                else
                                                                                    return null
                                                                            })}
                                                                        </List>
                                                                        <form>
                                                                            <Input
                                                                                value={this.state.Wednesday}
                                                                                onChange={this.handleInputChange}
                                                                                name="Wednesday"
                                                                                placeholder="Add New Task"
                                                                            />
                                                                            <FormBtn
                                                                                disabled={!(this.state.Wednesday)}
                                                                                onClick={this.handleFormSubmit}
                                                                                name="Wednesday"
                                                                            > +
                                                                            </FormBtn>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            <div className="row align-left centered">
                                                                <div className="yellow box four twelfths " id="day" >
                                                                    <h2 className="align-center">Thursday </h2>
                                                                        <List>
                                                                            {this.state.tasks.map(task => {
                                                                                if (task.username === this.state.username && task.label === "Thursday" && (task.completed) % 2 === 0) {
                                                                                    return (
                                                                                        <ListItem key={task._id}>
                                                                                            <Checkbox onClick={() => this.checkTask(task._id)} /> 
                                                                                                {task.task}
                                                                                            <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                        </ListItem>
                                                                                    );
                                                                                }
                                                                                else
                                                                                    return null
                                                                                })}
                                                                       {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Thursday" && (task.completed) % 2 === 1) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Completed onClick={() => this.checkTask(task._id)} /> 
                                                                                            <strike>{task.task}</strike>
                                                                                    <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                      );
                                                                                    }
                                                                                else
                                                                                    return null
                                                                            })}
                                                                        </List>
                                                                            <form>
                                                                                <Input
                                                                                    value={this.state.Thursday}
                                                                                    onChange={this.handleInputChange}
                                                                                    name="Thursday"
                                                                                    placeholder="Add New Task"
                                                                                />
                                                                                <FormBtn
                                                                                    disabled={!(this.state.Thursday)}
                                                                                    onClick={this.handleFormSubmit}
                                                                                    name="Thursday"
                                                                                > +
                                                                                </FormBtn>
                                                                            </form>
                                                                        </div>
                                                                    <div className="yellow box four twelfths " id="day">
                                                                        <h2 className="align-center">Friday</h2>
                                                                            <List>
                                                                                {this.state.tasks.map(task => {
                                                                                    if (task.username === this.state.username && task.label === "Friday" && (task.completed) % 2 === 0) {
                                                                                        return (
                                                                                            <ListItem key={task._id}>
                                                                                                <Checkbox onClick={() => this.checkTask(task._id)} /> 
                                                                                                    {task.task}
                                                                                                <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                            </ListItem>
                                                                                        );
                                                                                    }
                                                                                    else
                                                                                        return null
                                                                                })}
                                                                            {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Friday" && (task.completed) % 2 === 1) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Completed onClick={() => this.checkTask(task._id)} /> 
                                                                                            <strike>{task.task}</strike>
                                                                                    <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                      );
                                                                                    }
                                                                                else
                                                                                    return null
                                                                            })}
                                                                        </List>
                                                                            <form>
                                                                                <Input
                                                                                    value={this.state.Friday}
                                                                                    onChange={this.handleInputChange}
                                                                                    name="Friday"
                                                                                    placeholder="Add New Task"
                                                                                />
                                                                                <FormBtn
                                                                                    disabled={!(this.state.Friday)}
                                                                                    onClick={this.handleFormSubmit}
                                                                                    name="Friday"
                                                                                > +
                                                                                </FormBtn>
                                                                            </form>
                                                                        </div>
                                                                    <div className="yellow box four twelfths " id="day">
                                                                        <h2 className="align-center"> Sat / Sun</h2>
                                                                            <List>
                                                                                {this.state.tasks.map(task => {
                                                                                    if (task.username === this.state.username && task.label === "Weekend" && (task.completed) % 2 === 0) {
                                                                                        return (
                                                                                            <ListItem key={task._id}>
                                                                                                <Checkbox onClick={() => this.checkTask(task._id)} /> 
                                                                                                    {task.task}
                                                                                                <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                            </ListItem>
                                                                                        );
                                                                                    }
                                                                                    else
                                                                                        return null
                                                                                })}
                                                                            {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "Weekend" && (task.completed) % 2 === 1) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Completed onClick={() => this.checkTask(task._id)} /> 
                                                                                            <strike>{task.task}</strike>
                                                                                    <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                      );
                                                                                    }
                                                                                else
                                                                                    return null
                                                                            })}
                                                                        </List>
                                                                            <form>
                                                                                <Input
                                                                                    value={this.state.Weekend}
                                                                                    onChange={this.handleInputChange}
                                                                                    name="Weekend"
                                                                                    placeholder="Add New Task"
                                                                                />
                                                                                <FormBtn
                                                                                    disabled={!(this.state.Weekend)}
                                                                                    onClick={this.handleFormSubmit}
                                                                                    name="Weekend"
                                                                                > +
                                                                                </FormBtn>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    <div className="three twelfths" id="doOnce">
                                                        <div className="yellow box align-center double-padded animated bounceInRight">
                                                            <h1 className="align-center">Do Once</h1>
                                                                <div className="row align-left centered">
                                                                    <div className="yellow box">
                                                                        <List>
                                                                            {this.state.tasks.map(task => {
                                                                                if (task.username === this.state.username && task.label === "DoOnce" && (task.completed) % 2 === 0) {
                                                                                    return (
                                                                                        <ListItem key={task._id}>
                                                                                            <Checkbox onClick={() => this.checkTask(task._id)} /> 
                                                                                                {task.task}
                                                                                            <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                        </ListItem>
                                                                                    );
                                                                                }
                                                                                else
                                                                                    return null
                                                                            })}
                                                                        {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === "DoOnce" && (task.completed) % 2 === 1) {
                                                                                return (
                                                                                    <ListItem key={task._id}>
                                                                                        <Completed onClick={() => this.checkTask(task._id)} /> 
                                                                                            <strike>{task.task}</strike>
                                                                                    <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                                    </ListItem>
                                                                                      );
                                                                                    }
                                                                                else
                                                                                    return null
                                                                            })}
                                                                        </List>
                                                                        <form>
                                                                            <Input
                                                                                value={this.state.DoOnce}
                                                                                onChange={this.handleInputChange}
                                                                                name="DoOnce"
                                                                                placeholder="Add New Task"
                                                                            />
                                                                            <FormBtn
                                                                                disabled={!(this.state.DoOnce)}
                                                                                onClick={this.handleFormSubmit}
                                                                                name="DoOnce"
                                                                            > +
                                                                            </FormBtn>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
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

export default Schedule;
