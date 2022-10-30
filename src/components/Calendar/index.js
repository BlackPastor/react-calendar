import React, { Component } from "react";
import * as calendar from "./calendar";
import classnames from "classnames";
import "./index.css";

export default class Calendar extends Component {
  static defaultProps = {
    date: new Date(),
    years: [
      2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
      2022,
    ],
    monthNames: [
      "Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень",
    ],
    weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    onChange: Function.prototype,
  };

  state = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  };

  get year() {
     return this.state.date.getFullYear();
  }
  get month() {
     return this.state.date.getMonth();
  }
  get day() {
    return this.state.date.getDate();
  }

  handlePrevMonthButtonClick = () => {
    const date = new Date(this.year, this.month - 1); 
    this.setState({ date });
   
  };

  handleNextMonthButtonClick = () => {
    const date = new Date(this.year, this.month + 1);
    this.setState({ date });
    
  };

  handleSelectChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;
    const date = new Date(year, month);
    this.setState({ date })
  };

  handleDayClick = date => {
    this.setState({selectedDate: date})
    this.props.onChange(date)
  }

  render() {
    const { years, monthNames, weekDayNames } = this.props;
    const monthData = calendar.getMonthData(this.year, this.month);
    const {currentDate, selectedDate} = this.state;

    return (
      <div className="calendar">
        <header>
          <button onClick={this.handlePrevMonthButtonClick}>{"<"}</button>

          <select 
          onChange={this.handleSelectChange}
          ref={element => this.monthSelect = element}
          value={this.month}
          >
            {monthNames.map((name, index) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          </select>

          <select 
          onChange={this.handleSelectChange}
          ref={element => this.yearSelect = element}
          value={this.year}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button onClick={this.handleNextMonthButtonClick}>{">"}</button>
        </header>

        <table>
          <thead>
            <tr>
              {weekDayNames.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {monthData.map((week, index) => (
              <tr 
              className="week" 
              key={index}>
                {week.map((date, index) =>
                  date ? (
                    <td 
                    className={classnames('day', {
                      'today': calendar.areEqual(date, currentDate),
                      'selected': calendar.areEqual(date, selectedDate)
                    })} 
                    key={index} 
                    onClick={() => this.handleDayClick(date)}
                    >
                      {date.getDate()}
                    </td>
                  ) : (
                    <td key={index}></td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
