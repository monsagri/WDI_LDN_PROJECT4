import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class BudgetRoute extends React.Component {
  state = {
    userId: '',
    transactions: {
      [(new Date()).getFullYear()]: {[(new Date()).getMonth()]: []}
    },
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth(),
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/transactions`)
      .then(res => {
        console.log('getting res data',res.data);
        this.setState({ transactions: res.data, userId: `${this.props.match.params.id}` }, () => console.log('state post setState',this.state));
        console.log('finished setting state');
      });
  }

  delete = (id) => {
    console.log(id);
    axios({
      method: 'delete',
      url: `/api/users/${Auth.getPayload().sub}/transaction/${id}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ transactions: res.data }));
  }

  incrementMonth = (increment) => {
    if (this.state.month + increment < 0) return this.setState({ month: 11 , year: this.state.year - 1}, () => console.log(this.state.month, this.state.year));
    if (this.state.month + increment > 11) return this.setState({ month: 0 , year: this.state.year + 1}, () => console.log(this.state.month, this.state.year));
    return this.setState({ month: this.state.month + increment }, () => console.log(this.state.month));
  }


  incrementYear = (increment) => this.setState({ year: this.state.year + increment }, () => console.log(this.state.year))


  render(){
    return (
      <div className="container">
        <h2 className="title is-2">Your Transactions</h2>
        <h3 className="title is-3">{this.state.months[this.state.month]} - {this.state.year}</h3>
        <div className="transactionsNav">
          <div>
            <button
              className="button"
              onClick={() => this.incrementMonth(-1)}>Previous Month</button>
            <button
              className="button"
              onClick={() => this.incrementYear(-1)}>Previous Year</button>
          </div>
          <div>
            <button
              className="button"
              onClick={() => this.incrementMonth(1)}>Next Month</button>
            <button
              className="button"
              onClick={() => this.incrementYear(1)}>Next Year</button>
          </div>
        </div>
        <Link className="is-pulled-right button" to={`/users/${this.props.match.params.id}/new`}>New Transaction</Link>
        {this.state.transactions[this.state.year] !== undefined && this.state.transactions[this.state.year][this.state.month] !== undefined
          ?<table>
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
              {this.state.transactions[this.state.year][this.state.month].map((transaction, i) =>
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
          :<h2 className="subtitle is-2 has-text-centered">No Transactions recorded this Month</h2>}
      </div>
    );
  }
}

export default BudgetRoute;
