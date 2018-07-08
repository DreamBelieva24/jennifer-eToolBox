import React, { Component } from "react";

import "./Timer.css";

class Timer extends Component {
  constructor (props) {
    super(props)
    this.state = {count: 0}
  }
  // componentWillUnmount () {
  //   clearInterval(this.timer)
  // }
  tick () {
    this.setState({count: (this.state.count + 1)})
  }
  startTimer () {
    
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }

  stopTimer () {
    clearInterval(this.timer)
  }

  resetTimer () {
    clearInterval(this.timer)
    this.setState({count: 0})
  }

  render () {
    return (
      <span className='timer centered'>
        <h1 className="timer-h1">{this.state.count}</h1>
        
          <button className="button-me" onClick={this.startTimer.bind(this)}>Start</button>
          <button className="button-me" onClick={this.stopTimer.bind(this)}>Stop</button>
          <button className="button-me" onClick={this.resetTimer.bind(this)}>Reset</button>
        
      </span>
    )
  }
}

export default Timer;