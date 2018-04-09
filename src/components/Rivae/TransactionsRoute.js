import React from 'react';
import axios from 'axios';

class BudgetRoute extends React.Component {
  state = {
    userId: '',
    transactions: []
  }
  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/transactions`)

      .then(res => {
        console.log('getting res data',res.data);
        this.setState({ transactions: res.data, userId: `${this.props.match.params.id}` }, () => console.log('state post setState',this.state));
        console.log('finished setting state');
      });
  }

  render(){
    return (
      <div className="container">
        <h2 className="title is-2">Your Budget</h2>
        <ul>
          {this.state.transactions.map((transaction, i) =>
            <li key={i}>
              {transaction.description} - {transaction.amount}
            </li>)}
        </ul>
      </div>
    );
  }
}

export default BudgetRoute;
