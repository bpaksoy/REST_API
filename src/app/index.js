import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      users:[],
      active: false
    }
  }

  componentDidMount(){
    axios.get("/api/users")
    .then(response => this.setState({ users: response.data })
    ).catch(err => console.log(err))
  }

  handleChange(event){
    const target = event.target;
    const value = target.checked;
    console.log("value is: ", value)
    this.setState({
      active: value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    const password = this.refs.password.value;
    const user = {};
    const value = this.state.active

    user.name = name;
    user.password = password;
    user.active =  value;

    this.state.active = !this.state.active;
    this.refs.name.value = "";
    this.refs.password.value = "";

    axios.post("/api/users", user)
    .then(function(data){
      console.log("data is ", data)
    }).catch(function(err) {
				 console.log("we have not got the data!");
			 });

    axios.get("/api/users")
     .then(response => this.setState({ users: response.data })
     ).catch(err => console.log(err))

  }

render(){
  var users = this.state.users;
  users = users.map(function(user, index){
    return(
      <li key={index}>
       <span className={user.active.toString()}></span>
       <span className={user.name}>{user.name}</span>
      </li>
    )
  });

  return(
    <div id="user-container">
      <form id="search" onSubmit={this.handleSubmit.bind(this)}>
        <label>Enter your Name:</label>
        <input type="text" ref="name" placeholder="Name" required/>
        <label>Enter your password:</label>
        <input type="password" ref="password" placeholder="Password" required/>
        <label>Active Status</label>
        <input type="checkbox" name="active" ref="active" checked={ this.state.active } onChange={this.handleChange.bind(this)} />
        <input type="submit" value="Add User"/>
      </form>
      <ul>{users}</ul>
    </div>
  );
 }
}

ReactDOM.render(<User/>, document.getElementById("users"));
