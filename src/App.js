import React from "react";
import { Component } from "react";
import Calendar from "./components/Calendar"

class App extends Component {
  state = {
    date: null,
  }

  handleDateChange = date => this.setState({ date })
  
  render() {
    const { date } = this.state;
    return (
    <div>
      {date && <p>Обрана дата: {date.toLocaleDateString()}</p>}
      <Calendar 
      onChange={this.handleDateChange}/>
    </div>
    )
  }
}

export default App;
