import "./Main.css";
import React, { Component } from "react";
import customData from"../customData.json"

class Table extends Component {
  state = {
    search: "",
    sortAsc: true,
    employees: customData,
  };

  sortEmployees = (field) => {
    function compareAsc(a, b) {
      if (a[field] > b[field]) return 1;
      if (b[field] > a[field]) return -1;

      return 0;
    }

    function compareDesc(a, b) {
      if (a[field] > b[field]) return -1;
      if (b[field] > a[field]) return 1;

      return 0;
    }
    if (this.state.sortAsc) {
      const sortedEmployees = this.state.employees.sort(compareAsc);
      this.setState({
        employees: sortedEmployees,
        sortAsc: false,
      });
    } else {
      const sortedEmployees = this.state.employees.sort(compareDesc);
      this.setState({
        employees: sortedEmployees,
        sortAsc: true,
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if(this.state.search === "") {
      window.location.reload();
    }

    this.filterEmployees();
  };

  filterEmployees = () => {
    const searchTerm = this.state.search.toLowerCase();
    this.setState({
      employees: this.state.employees.filter(
        (employees) =>
          employees.firstName.toLowerCase().includes(searchTerm) ||
          employees.lastName.toLowerCase().includes(searchTerm) ||
          employees.userID.toLowerCase().includes(searchTerm) ||
          employees.email.toLowerCase().includes(searchTerm) ||
          employees.age.toLowerCase().includes(searchTerm)
      ),
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a className="navbar-brand bold">User Directory</a>
          <form className="form-inline" onSubmit={this.handleFormSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Search by name"
              name="search"
              value={this.state.search}
              onChange={this.handleInputChange}
            ></input>
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>
        </nav>
        <table className="table">
          <thead className="thead">
            <tr>
              <th
                scope="col"
                onClick={() => {
                  this.sortEmployees("firstName");
                }}
              >
                <button className="btn btn-outline-dark">First name</button>
              </th>
              <th
                scope="col"
                onClick={() => {
                  this.sortEmployees("lastName");
                }}
              >
                <button className="btn btn-outline-dark">Last name</button>
              </th>
              <th
                scope="col"
                onClick={() => {
                  this.sortEmployees("userID");
                }}
              >
                <button className="btn btn-outline-dark">User ID</button>
              </th>
              <th
                scope="col"
                onClick={() => {
                  this.sortEmployees("email");
                }}
              >
                <button className="btn btn-outline-dark">Email</button>
              </th>
              <th
                scope="col"
                onClick={() => {
                  this.sortEmployees("age");
                }}
              >
                <button className="btn btn-outline-dark">Age</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employees) => (
              <tr key={employees.userID}>
                <td>{employees.firstName}</td>
                <td>{employees.lastName}</td>
                <td>{employees.userID}</td>
                <td>{employees.email}</td>
                <td>{employees.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
