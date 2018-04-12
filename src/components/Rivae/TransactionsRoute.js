import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

import Title from '../../assets/styledComponents/Title';
import FlexRowDiv  from '../../assets/styledComponents/FlexRowDiv';
import TransactionNav  from '../../assets/styledComponents/TransactionNav';

import TransactionFormTable from './TransactionFormTable';
import TransactionTable from './TransactionTable';

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
    axios({
      method: 'get',
      url: `/api/users/${this.props.match.params.id}/transactions`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
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
    return (
      <div className="container">

        <Title>Your Transactions</Title>

        <TransactionNav>
          <div>
            <h4 className="subtitle is-4">Input a single Transaction</h4>
            <button
              className="button"
              onClick={this.toggleNewTransaction}>New Transaction</button>
          </div>

          <CSVReader handleChange={this.handleCSVChange} passCSV={this.passCSV}/>
        </TransactionNav>

        
        <h3 className="title is-3">{this.state.months[this.state.month]} - {this.state.year}</h3>

        <TransactionNav>
          <FlexRowDiv>
            <button
              className="button"
              onClick={() => this.incrementMonth(-1)}>Previous Month</button>
          </FlexRowDiv>

          <FlexRowDiv>
            <button
              className="button"
              onClick={() => this.incrementMonth(1)}>Next Month</button>
          </FlexRowDiv>
        </TransactionNav>

        <TransactionFormTable
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          data={this.state.newTransaction}
          display={this.state.newTransactionToggle}
          toggle={this.toggleNewTransaction}
        />

        {this.state.transactions[this.state.year] !== undefined && this.state.transactions[this.state.year][this.state.month] !== undefined
          ? <TransactionTable
            transactions={this.state.transactions}
            year={this.state.year}
            month={this.state.month}
            userId={this.state.userId}
            remove={this.delete} />
          :<h2 className="subtitle is-2 has-text-centered">No Transactions recorded this Month</h2>}

      </div>
    );
  }
}

export default BudgetRoute;
