import React, { Component } from 'react';
import './Welcome.css'
import queryString from 'query-string'

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      tracksArr: [],
      userLoggedIn: false,
      userToken: undefined
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let token = parsed.access_token
    console.log(token)
    if (token) {
      this.setState({
        userToken: token,
        userLoggedIn: true
      }, function() {
        this.userCall()
      })
    }
  }

  userCall() {
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + this.state.userToken}
      }).then(res => res.json())
      .then(data => {
        this.setState({
          userData: data
         
        })
      })
      .catch(error => console.error('Error:', error))
  }

  tempoCall() {
    fetch("https://api.spotify.com/v1/recommendations?limit=20&market=US&seed_genres=hip-hop&target_tempo=88", {
      headers: {'Authorization': 'Bearer ' + this.state.userToken}
    }).then(res => res.json())
    .then(data => {
      this.setState({
        tracksArr: data.tracks
      })
    })
  }

  login() {
    if (this.state.userToken !== undefined) {
      this.userCall()
    } else {
      window.location = "http://localhost:8888/login"
      this.userCall()
    }
  }

  render() {
    return (
      <div className="Welcome">
      <h1>Spotify Search Utility</h1>
        {this.state.userLoggedIn &&
          <div>
            <h1>Welcome back {this.state.userData.id}!</h1>
            <button type="button" className="tempoButton" onClick={this.tempoCall.bind(this)}>search</button>
            <div className="searchResults">
              {this.state.tracksArr.map((track, i) => {
                return (
                  <iframe title={track.name} key={i} src={`https://embed.spotify.com/?uri=${track.uri}`}></iframe>        
                )
              })}
            </div>
          </div>
        }
        {!this.state.userLoggedIn &&
          <div>
            <p>Welcome to spotify search. This app will allow you to search for tracks based on genre and beats per minute (BPM). Please log in to you spotify to give this app persmission to search for tracks and access your current tracks.</p> 
            <button type="button" className="logInButton" onClick={this.login.bind(this)}>log in</button> 
          </div>
        }
      </div>
    );
  }

}

export default Welcome;









