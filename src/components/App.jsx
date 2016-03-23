import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'kazuto123',
      userData: [],
      userRepo: [],
      perPage: 5
    }
  }

  // Get user data from github
  getUserData() {
    $.ajax({
      url: 'https://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log(data);
      }.bind(this),
      error: function(xhr, status, error){
        alert(error);
      }.bind(this)  
    });
  }

  componentDidMount(){
    this.getUserData();
  }

  render() {
    return (
      <div>
        Username: {this.state.username}
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
