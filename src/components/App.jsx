import React, {Component} from 'react';

import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'kazuto123',
      userData: [],
      userRepos: [],
      perPage: 10
    }
  }

  // Get user data from github
  getUserData() {
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userData:data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, error){
        this.setState({username: null});
        alert(error);
      }.bind(this)
    });
  }

  // Get user repos
  getUserRepos() {
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username + '/repos?per_page='+ this.state.perPage +'&client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret+'&sort=created',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({userRepos:data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, error){
        this.setState({username: null});
        alert(error);
      }.bind(this)
    });
  }

  handleFormSubmit(username) {
    this.setState({username: username}, function(){
      this.getUserData();
      this.getUserRepos();
    });
  }

  componentDidMount(){
    this.getUserData();
    this.getUserRepos();
  }

  render() {
    return (
      <div>
        <Search onFormSubmit={this.handleFormSubmit.bind(this)}/>
        <Profile {...this.state}/>
      </div>
    );
  }
}

App.propType = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
}

App.defaultProps = {
  clientId: '118714378d1f6402fad6',
  clientSecret: 'cd2e5b70aa94c235d200fc3cb70267d297d6269b'
}

export default App
