import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

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
  delete= (id) => {
    console.log(id);
    axios({
      method: 'delete',
      url: `/api/users/${Auth.getPayload().sub}/transaction/${id}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ transactions: res.data }));
  }

  render(){
    return (
      <div className="container">
        <h2 className="title is-2">Your Transactions</h2>
        <Link className="is-pulled-right button" to={`/users/${this.props.match.params.id}/new`}>New Transaction</Link>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* Need to sort transactions by date first */}
            {this.state.transactions.map((transaction, i) =>
              <tr key={i}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td><Link className="button" to={`/users/${this.props.match.params.id}/transaction/${transaction._id}/edit`}>Edit</Link></td>
                <td><button className="button" onClick={() => this.delete(transaction._id)}>X</button></td>
              </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BudgetRoute;
