import React, { Component } from 'react';
import './Welcome.css'
import queryString from 'query-string'

class Welcome extends Component {
  state = {
    userData: {},
    // userToken: null,
    user: ""
  }
  login() {
    console.log("button working yayy")
    window.location = "http://localhost:8888/login"
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let userToken = parsed.access_token
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + userToken}
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({userData: data})
    })
    .catch(error => console.error('Error:', error))

  }
  render() {
    return (
      <div className="welcome">
        <h1>search spotify</h1>
        <p>Welcome to spotify search. This app will allow you to search for tracks based on genre and beats per minute (BPM). Please log in to you spotify to give this app persmission to search for tracks and access your current tracks.</p>
        <button type="button" className="logInButton" onClick={this.login}>log in</button>
        <h1>you are logged in {this.state.userData.id}!</h1>
      </div>
    );
  }
}

export default Welcome;
