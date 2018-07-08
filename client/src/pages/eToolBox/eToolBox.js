import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Nav from "../../components/Nav";
import Toolbar from "../../components/Toolbar";
import Checkbox from "../../components/Checkbox";
import Starred from "../../components/Starred";
import Completed from "../../components/Completed";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { TextArea, FormBtn } from "../../components/Form";
import soundFile from './alarm.mp3';
// import axios from "axios";

var d = new Date();
var n = d.getDay()

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Weekend", "Weekend"]
var currentDay = weekdays[n - 1] || "Weekend";
var audio = new Audio(soundFile)

class eToolBox extends Component {
    state = {
        Monday: "",
        Tuesday: "",
        Wednesday: "",
        Thursday: "",
        Friday: "",
        Weekend: "",
        tasks: [],
        task: "",
        label: "",
        completed: "",
        username: "",
        subscriptions: [],
        Subscription: "",
        name: "",
        count: 1500,
        play: false,
        audio: new Audio(soundFile)

    };

    timer = {};
    
    componentDidMount() {
        this.loadTask();
        this.getUser();
        this.loadSubscriptions();
    };

    getUser = () => {
        API.getUser()
            .then(res => {
                this.setState({ username: res.data.username })
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
                this.setState({ tasks: res.data }),
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
                username: this.state.username,
                name: this.state.name,
                date: new Date(),

            })
                .then(res => this.loadTask())
                .catch(err => console.log(err));
        }
    };

    handleClick = event => {
        this.handleFormSubmit(event)
        alert("Note added to your notebook!")
    }

    togglePlay() {
        this.setState({ play: !this.state.play });
        this.togglePlay.bind(this)
        this.state.play ? audio.play() : audio.pause() ;
      }


    tick () {
        this.setState({count: (this.state.count - 1)})

        if (this.state.count === 0){
            this.togglePlay()
            alert("Time's Up!")
            clearInterval(this.timer)
        }
      }

    startTimer () {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000)
      }
    
    stopTimer () {
        clearInterval(this.timer)
      }
    
    resetWork () {
        clearInterval(this.timer)
        this.setState({count: 1500})
      }

    resetBreak () {
        clearInterval(this.timer)
        this.setState({count: 300})
      }

    format() {

        let seconds = Math.floor(this.state.count);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        
        minutes = minutes < 1 ? '00' : minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `${minutes}:${seconds}`;
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <div id="index">
                            <Nav name="Dashboard" />
                                <Toolbar />
                                    <div className="row padded">
                                        <div className="five twelfths skip-one gapped">
                                            </div>
                                        <div className="five twelfths skip-one gapped">
                                            <div className="asphalt box align-center animated bounceInLeft">
                                                 <h1>Quick Look </h1>
                                                    <hr></hr>
                                                    <div className="yellow box align-left animated bounceInLeft">
                                                        <h2 className="align-center">Today's Tasks</h2>
                                                        <h3 className="align-center">{currentDay}</h3>
                                                            <List>
                                                                {this.state.tasks.map(task => {
                                                                    if (task.username === this.state.username && task.label === currentDay && (task.completed) % 2 === 0) {
                                                                        return (
                                                                            <ListItem key={task._id}>
                                                                                <Checkbox onClick={() => this.checkTask(task._id)} /> {task.task}
                                                                                <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                            </ListItem>
                                                                        );
                                                                     }
                                                                    else
                                                                        return null
                                                                })}
                                                                {this.state.tasks.map(task => {
                                                                            if (task.username === this.state.username && task.label === currentDay && (task.completed) % 2 === 1) {
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
                                                    </div>
                                                </div>
                                            </div>
                                                
                                                    <div className="five twelfths gapped orange box animated bounceInLeft">
                                                    <h1 className="align-center">Quick Note</h1>
                                                    <hr></hr>
                                                    <form>
                                                <TextArea
                                                    value={this.state.Notes}
                                                    onChange={this.handleInputChange}
                                                    name="Notes"
                                                    placeholder="Add New Note"
                                                />
                                                <FormBtn
                                                    disabled={!(this.state.Notes)}
                                                    onClick={this.handleClick}
                                                    name="Notes"
                                                > +
                                                </FormBtn>
                                                     </form>
                                                    </div>
                                                
                                        </div>
                                                <div className="row align-center triple-padded">
                                                    <div className="five twelfths skip-one gapped">
                                                        <div className="yellow box align-center animated bounceInRight">
                                                        <h1 className="align-center">Starred Bookmarks</h1>
                                                        <hr></hr>
                                                        <List>
                                                {this.state.tasks.map(task => {
                                                    if (task.username === this.state.username && (task.label === "Bookmark2" || task.label === "Bookmark1") && (task.completed) % 2 === 1) {
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
                                                </List>
                                                        </div>
                                                    </div>
                                                    <div className="five twelfths gapped ">
                                                        <div className="blue box align-center animated bounceInRight">
                                                            <h1>Quick Timer</h1>
                                                            <hr></hr>
                                                            <span className='timer centered'>
                                                                        <h1 className="timer-h1">{this.format(this.state.count)}</h1>
                                                                        
                                                                        <button className="button-me" onClick={() => this.startTimer()}>Start</button>
                                                                        <button className="button-me" onClick={() => this.stopTimer()}>Stop</button>
                                                                        <button className="button-me" onClick={this.resetWork.bind(this)}>Work</button>
                                                                        <button className="button-me" onClick={this.resetBreak.bind(this)}>Break</button>
                                                                        
                                                                    </span>
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

export default eToolBox;
