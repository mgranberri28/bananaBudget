import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = { 
     date: '',
     days: '',
     cost: '', 
     months: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],    
    };


    this.handleDate = this.handleDate.bind(this); 
    this.handleDays = this.handleDays.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  // handleDate event handler
   handleDate(e) { 
    const value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        date: value
      }),
      () => console.log(this.state.date)
    );
  }

  // handleDays event handler
  handleDays(e) { 
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        days: value
      }),
      () => console.log(this.state.days)
    );
  }

  // handleFormSubmit event handler
  handleFormSubmit(e) {
    e.preventDefault();
    
    let cost = 0; // cost after calculations 
    const userDate = new Date(this.state.date); // user inputed date in Javascript format
    let month = userDate.getMonth()
    let dayOfWeek = userDate.getDay(); // day of week (0 - 6, Sun - Sat)
    let daysLeft = this.state.days; // number of days remaining after each iteration
    let numericDay = Number(this.state.date.slice(3, 5)); // numeric day of month

    while( daysLeft > 0 ) { // iterate as long as user inputed days have not reached 0
    //  console.log('month is ', month)
     console.log('days this month is ',this.state.months[month])
     console.log('new month is ', month)
    console.log('calendar day is ', numericDay);
      if(dayOfWeek !== 0 && dayOfWeek !== 6) { // check if current day of week is not a weekend

        if(numericDay > 0 && numericDay <= 7) cost += .05; // add .05 cents to cost if calender day is between 1 & 7

        if(numericDay > 7 && numericDay <= 14) cost += .10; // add .10 cents to cost if calender day is between 8 & 14

        if(numericDay > 14 && numericDay <= 21) cost += .15; // add .15 cents to cost if calender day is between 15 & 21

        if(numericDay > 21 && numericDay <= 28) cost += .20; // add .20 cents to cost if calender day is between 22 & 28

        if(numericDay > 28 && numericDay <= 31) cost += .25; // add .25 cents to cost if calender day is between  29 & 31

        if(numericDay > this.state.months[month]){
          month += 1;
          console.log('new month is ', month)
          numericDay = 0;
        }

        


        dayOfWeek += 1; // change to next day of week 

        daysLeft -= 1; // decrement days remaining by one

        numericDay += 1; // increment to next calendar day

      }else if(dayOfWeek === 0) { // if day of week is sunday

        daysLeft -= 1 // decrement days reamining by one

        numericDay += 1; //increment to next calendar day

        dayOfWeek += 1; //change day of week to monday

      }else if(dayOfWeek === 6) { // if day of week is saturday

        daysLeft -= 1 // decrement days reamining by one

        dayOfWeek = 0 // change day of week to sunday

      numericDay += 1; //increment to next calendar day
      }

      // if(numericDay === this.state.months[month]){
      //   // month += 1;
      //   console.log('new month is ', month)
      //   numericDay =+;
      // }
      
      // if(numericDay > this.state.months[month]){
      //   month += 1;
      //   console.log('new month is ', month)
      //   numericDay = 1;
      // }

      
    };
    console.log('day is')
    console.log('new month is ', month)
    console.log('calendar day is ', numericDay);
  

    this.setState((prevState) => { // update date and cost in state
      return {
        ...prevState,
        date: new Date(prevState.date),
        cost: cost.toFixed(2)
      }
    });

    // fetch request to post updated state

    fetch('http://localhost:3003/create', {
      method: "POST",
      body: JSON.stringify({
        date: userDate,
        days: this.state.days,
        cost: cost.toFixed(2)
      }),
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });

  }

  // handleClearForm event handler
  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      date: '',
      days: '',
      cost: ''
    });
  }

  render() {
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>

        {/* Date */}
        <Input
          inputType={"text"}
          title={"Date"}
          name={"date"}
          value={this.state.date}
          placeholder={"Enter Date MM/DD/YY"}
          handleChange={this.handleDate}
        />
        
        {/* Number Of Days */}
        <Input
          inputType={"text"}
          name={"days"}
          title={"Number of Days"}
          value={this.state.days}
          placeholder={"Enter number of days"}
          handleChange={this.handleDays}
        />

        {/*Submit Button */}
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
          style={buttonStyle}
        />

        {/* Clear the form */}
        <Button
          action={this.handleClearForm}
          type={"primary"}
          title={"Clear"}
          style={buttonStyle}
        />
        <br/>

        <div className="col-md-6">
          <h3>Total Cost: {this.state.cost} </h3> 
        </div>
      </form>
    );
  }  
} 

const buttonStyle = {
  margin: "10px 10px 10px 10px",
  "backgroundColor": "yellow",
  color: "black"
};

export default FormContainer;
