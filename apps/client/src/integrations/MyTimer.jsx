import React, { Component } from 'react';
import { useTimer } from 'react-timer-hook';

class MyTimer extends Component{
  constructor(props){
    super(props);

    this.state = {
      seconds: 0,
      minutes: 10, 
      hours: 0,
      days: 0,
      isRunning: true
    };

    this.timerRef = null;
    this.handleExpire = this.handleExpire.bind(this);
  }

  componentDidMount() {
    const { expiryTimestamp } = this.props;
    this.timerInterval = setInterval(() => {
      const timeRemaining = expiryTimestamp - Date.now();
      if (timeRemaining > 0) {
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        this.setState({
          seconds,
          minutes,
          hours,
          days,
        });
      } else {
        clearInterval(this.timerInterval);
        this.handleExpire();
      }
    }, 1000);
  }

  componentDidUpdate(){
    if (this.props.pause) {
      clearInterval(this.timerInterval);
    } else if (!this.props.pause) {
      this.timerInterval = setInterval(() => {
        const timeRemaining = expiryTimestamp - Date.now();
        if (timeRemaining > 0) {
          const seconds = Math.floor((timeRemaining / 1000) % 60);
          const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
          const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  
          this.setState({
            seconds,
            minutes,
            hours,
            days,
          });
        } else {
          clearInterval(this.timerInterval);
          this.handleExpire();
        }
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.timerRef = null;
  }

  handleExpire() {
    console.log("cos tam");
  }

  render() {
    const {  seconds, minutes, hours, days } = this.state;

    return(
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '50px', background: "white"}}>
        <span>{this.state.days}</span>:<span>{this.state.hours}</span>:<span>{this.state.minutes}</span>:<span>{this.state.seconds}</span>
      </div>
    </div>)
  }
}

export default MyTimer;