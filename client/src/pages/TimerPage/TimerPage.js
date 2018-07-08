import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import Toolbar from "../../components/Toolbar";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import "../../components/Timer/Timer.css";




class TimerPage extends Component {

    state = {
        tasks: [],
        task: "",
        username: "",
        timers: [],
        Timer: "",
        count: 0
    
    };

    timer = {};

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

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,

        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const { name } = event.target;
        if (this.state[name]) {
            API.saveTask({
                task: this.state[name],
                label: name,
                count: 0,
                username: this.state.username

            })
                .then(res => this.loadTask())
                .catch(err => console.log(err));
        }
    };

    tick(id)  {
        this.setState({ [id]: {count: (this.state[id].count + 1)}}, function(){
        })
      }

    startTimer = id => {

        API.getTask(id)
            .then(res => {
                this.setState({ [id]: {count: parseInt(res.data.count, 10), isRunning: true} })
                if (this.timer[id]) clearInterval(this.timer[id]);
                this.timer[id] = setInterval(() => this.tick(id), 1000)
    })
}
    
    stopTimer = (id) => {
        clearInterval(this.timer[id])
        API.updateTask(id, this.state[id].count)
            .then(res => {
                this.setState({ [id]: {count: this.state[id].count}, isRunning: false });
                this.loadTask()
            
            }
    )
}
      
    resetTimer = (id) => {
        clearInterval(this.timer[id])
        API.updateTask(id, 0)
            .then(res => {
                this.setState({ [id]: {count: 0} });
                this.loadTask()
            })
        }

    format = count => {
            //let seconds = Math.floor(count);
            let minutes = Math.floor(count / 60);
            let seconds = count % 60;
            
    
            minutes = minutes < 1 ? '00' : minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds
            return `${minutes}:${seconds}`;
        }



    render() {
       return( 
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <div id="index">
                            <Nav name="Timer" />
                                <Toolbar />
                                    <div className="row align-center">
                                        <div className="five asphalt box twelfths centered gapped animated bounceInLeft">
                                            <div className="align-center">
                                                <h1 className="align-center">Task Timers</h1>
                                            
                                            <List>
                                                {this.state.tasks.map(task => {
                                                    if (task.username === this.state.username && task.label === "Timer") {
                                                        return (
                                                            <ListItem key={task._id}>
                                                                    {task.task}
                                                                    <DeleteBtn onClick={() => this.deleteTask(task._id)} />
                                                                    <span className='timer centered'>
                                                                        <h1 className="timer-h1">{this.format(this.state[task._id] ? this.state[task._id].count : (task.count))}</h1>
                                                                        
                                                                        <button className="button-me" onClick={() => this.startTimer(task._id)}>Start</button>
                                                                        <button className="button-me" onClick={() => this.stopTimer(task._id)}>Stop</button>
                                                                        <button className="button-me" onClick={() => this.resetTimer(task._id)}>Reset</button>
                                                                        
                                                                    </span>
                                                            </ListItem>
                                                        );
                                                    }
                                                    else    
                                                        return null
                                                })}
                                            </List>
                                            
                                            <br></br>
                                            <form>
                                                <Input
                                                    value={this.state.Timer}
                                                    onChange={this.handleInputChange}
                                                    name="Timer"
                                                    placeholder="Add New Task Timer"
                                                />
                                                <FormBtn
                                                    disabled={!(this.state.Timer)}
                                                    onClick={this.handleFormSubmit}
                                                    name="Timer"
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
export default TimerPage;