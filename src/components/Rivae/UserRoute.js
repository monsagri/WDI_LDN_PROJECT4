import React from 'react';
import axios from 'axios';

class UserRoute extends React.Component{
  state = {
    user: {
      admin: '',
      avatar: '',
      created: '',
      email: '',
      transactions: [],
      username: '',
      balance: ''
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data}, () => console.log(this.state)));
  }

  render() {
    return (
      <div className="container">
        <h1 className="title is-1">{this.state.user.username}</h1>
        <h3 className="title is-3">Balance: {this.state.user.balance}</h3>

      </div>
    );
  }

}

export default UserRoute;
