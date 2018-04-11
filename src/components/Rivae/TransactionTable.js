import React from 'react';
import { Link } from 'react-router-dom';

import BasicTable from '../../assets/styledComponents/BasicTable';
import DeleteButton from '../fragments/DeleteButton';

const TransactionTable = ({transactions, year, month, userId, remove}) =>{
  return(
    <BasicTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions[year][month].map((transaction, i) =>
          <tr key={i}>
            <td>{transaction.date}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>{transaction.description}</td>
            <td><Link className="button" to={`/users/${userId}/transaction/${transaction._id}/edit`}><i className="fas fa-edit"></i></Link></td>
            <td>
              <DeleteButton
                className="button"
                type="button"
                onClick={() => remove(transaction._id)}
              />
            </td>
          </tr>)}
      </tbody>
    </BasicTable>
  );
};

export default TransactionTable;
