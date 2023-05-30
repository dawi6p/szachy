import React, { Component } from 'react';

class MyTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      minutes: 10,
      hours: 0,
      days: 0,
      isPaused: false,
      diff: Date,
    };

    this.timerInterval = null;
    this.handleExpire = this.handleExpire.bind(this);
  }

  componentDidMount() {
    const { expiryTimestamp } = this.props;
      this.startTimer(expiryTimestamp);
  }


  componentDidUpdate(prevProps) {
    if (this.props.pause !== prevProps.pause) {
      if(!this.props.pause) {
        const { expiryTimestamp } = this.props;
        this.startTimer(expiryTimestamp);
      }
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer(expiryTimestamp) {
    this.timerInterval = setInterval(() => {
      const timeRemaining = expiryTimestamp - Date.now()*2 +this.state.diff;
      if (timeRemaining > 0) {
        if(this.props.pause)
        {
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
        }
        else{
          this.stopTimer();
        }
      } else {
        this.stopTimer();
        this.handleExpire();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.setState({
      diff: Date.now()
    })
  }

  handleExpire() {
    console.log("cos tam");
  }

  render() {
    return(
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '30px', background: "white"}}>
        <span>{this.state.days}</span>:<span>{this.state.hours}</span>:<span>{this.state.minutes}</span>:<span>{this.state.seconds}</span>
      </div>
    </div>)
  }
}

export default MyTimer;