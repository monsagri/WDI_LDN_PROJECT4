import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

import Title from '../../assets/styledComponents/Title';
import FlexRowDiv  from '../../assets/styledComponents/FlexRowDiv';
import TransactionNav  from '../../assets/styledComponents/TransactionNav';
import BasicTable  from '../../assets/styledComponents/BasicTable';

import TransactionFormTable from './TransactionFormTable';
import DeleteButton from '../fragments/DeleteButton';

import CSVReader from '../common/CSVReader';

// import filestackAPI from 'process.env.FILESTACK';

class BudgetRoute extends React.Component {
  state = {
    userId: '',
    transactions: {
      [(new Date()).getFullYear()]: {[(new Date()).getMonth()]: []}
    },
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth(),
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    newTransaction: {
      date: '',
      amount: 0,
      category: '',
      description: '',
      errors: {}
    },
    newTransactionToggle: false,
    text: ''
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/transactions`)
      .then(res => {
        this.setState({ transactions: res.data, userId: `${this.props.match.params.id}` }, () => console.log('state post setState',this.state));
      });
  }

  delete = (id) => {
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

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.newTransaction);
    axios({
      method: 'post',
      url: `/api/users/${Auth.getPayload().sub}/transactions`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: this.state.newTransaction
    })
      .then(res => {
        this.setState({ transactions: res.data });
        this.toggleNewTransaction();
      })
      .catch(err => this.setState( {errors: err.response.data.errors}));
  }

  handleChange = ({ target: { name, value } }) => {
    console.log(name, value);
    const errors = { ...this.state.errors, [name]: ''};
    const editedTransaction = {...this.state.newTransaction};
    editedTransaction[name] = value;
    this.setState({ newTransaction: editedTransaction, errors }, () => console.log(this.state));
  }

  toggleNewTransaction = () => {
    this.setState( { newTransactionToggle: !this.state.newTransactionToggle, newTransaction: {
      date: '',
      amount: 0,
      category: '',
      description: '',
      errors: {}
    }}, () => console.log(this.state));
  }

  handleCSVChange = text => {
    // sets state to the text the user has uploaded
    this.setState({ text }, () => console.log(this.state));
  }

  passCSV = () => {
    const csv = this.state.text;
    axios({
      method: 'post',
      url: `/api/users/${Auth.getPayload().sub}/transactions/bulk`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: { data: {csv} }
    })
      .then(res => this.setState({text: '', transactions: res.data}, () => console.log('uploaded', this.state)));
  }

  render(){
    // console.log('api key is ', filestackAPI);
    return (
      <div className="container">
        <Title>Your Transactions</Title>
        <h3 className="title is-3">{this.state.months[this.state.month]} - {this.state.year}</h3>
        <TransactionNav>
          <FlexRowDiv>
            <button
              className="button"
              onClick={() => this.incrementMonth(-1)}>Previous Month</button>
            {/* <button
              className="button"
              onClick={() => this.incrementYear(-1)}>Previous Year</button> */}
          </FlexRowDiv>
          {/* <Link className="is-pulled-right button" to={`/users/${this.props.match.params.id}/new`}>New Transaction</Link> */}
          <button
            className="button"
            onClick={this.toggleNewTransaction}>New Transaction</button>

          <FlexRowDiv>
            {/* <button
              className="button"
              onClick={() => this.incrementYear(1)}>Next Year</button> */}
            <button
              className="button"
              onClick={() => this.incrementMonth(1)}>Next Month</button>
          </FlexRowDiv>
        </TransactionNav>

        <CSVReader handleChange={this.handleCSVChange} passCSV={this.passCSV}/>

        <TransactionFormTable
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          data={this.state.newTransaction}
          display={this.state.newTransactionToggle}
          toggle={this.toggleNewTransaction}
        />

        {this.state.transactions[this.state.year] !== undefined && this.state.transactions[this.state.year][this.state.month] !== undefined
          ?<BasicTable>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
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
                  <td><Link className="button" to={`/users/${this.props.match.params.id}/transaction/${transaction._id}/edit`}><i className="fas fa-edit"></i></Link></td>
                  <td>
                    <DeleteButton
                      className="button"
                      type="button"
                      onClick={() => this.delete(transaction._id)}
                    />
                  </td>
                </tr>)}
            </tbody>
          </BasicTable>
          :<h2 className="subtitle is-2 has-text-centered">No Transactions recorded this Month</h2>}
      </div>
    );
  }
}

export default BudgetRoute;
