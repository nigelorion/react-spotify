import React, { Component } from 'react';
import './Welcome.css'
import queryString from 'query-string'

class Welcome extends Component {
  state = {
    userData: {},
    userLoggedIn: false,
    user: ""
  }
  // this.login = this.login.bind(this);
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let userToken = parsed.access_token
    if (userToken !== undefined){
      this.setState(this.userLoggedIn: false)
    }
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + userToken}
    }).then(res => res.json())
    .then(data => {
      this.setState({userData: data})
      this.setState(this.userLoggedIn: true)
      console.log(this.state.userData)
    })
    .catch(error => console.error('Error:', error))
  }
  login = () => {
    if (this.state.userLoggedIn) {
      console.log("user logged already")
    } else {
      window.location = "http://localhost:8888/login"
      console.log(this.state.userLoggedIn)
      this.componentDidMount()
    }
  }
  render() {
    <div this.state.userLoggedIn={true} className="welcome">
      <h1>Welcome back {this.state.userData.id}!</h1>
    </div>

    <div className="welcome">
      <h1>search spotify</h1>
      <p>Welcome to spotify search. This app will allow you to search for tracks based on genre and beats per minute (BPM). Please log in to you spotify to give this app persmission to search for tracks and access your current tracks.</p>
      <button type="button" className="logInButton" onClick={this.login}>log in</button>
    </div>
  }
}

export default Welcome;
