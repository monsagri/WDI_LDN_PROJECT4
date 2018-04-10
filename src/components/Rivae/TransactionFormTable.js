import React from 'react';

import BasicTable from '../../assets/styledComponents/BasicTable';

const Form = ({ handleSubmit, handleChange, data, display, toggle}) => {
  console.log(data);
  if(!display) return null;
  return (

    <form onSubmit={handleSubmit}>
      <BasicTable>
        <tbody>
          <tr>
            <td>
              <label htmlFor="date">Date</label>
              <input className="input"
                value={data.date}
                name="date"
                onChange={handleChange}
                type="date"
              />
              {data.errors.amount && <small>{data.errors.amount}</small>}
            </td>
            <td>
              <label htmlFor="amount">Amount</label>
              <input className="input"
                value={data.amount}
                name="amount"
                onChange={handleChange}
                type="number"
              />
              {data.errors.amount && <small>{data.errors.amount}</small>}
            </td>
            <td>
              <label htmlFor="category">Category</label>
              <input className="input"
                value={data.category}
                name="category"
                onChange={handleChange}
              />
              {data.errors.category && <small>{data.errors.category}</small>}
            </td>
            <td>
              <label htmlFor="description">Description</label>
              <input className="input"
                value={data.description}
                name="description"
                onChange={handleChange}
                placeholder="Name of Payee, etc."
              />
              {data.errors.description && <small>{data.errors.description}</small>}
            </td>
            <td>
              <button className="button is-primary">Submit</button>
            </td>
            <td>
              <button
                className="button is-danger"
                type="button"
                onClick={toggle}>Cancel</button>
            </td>
          </tr>
        </tbody>
      </BasicTable>
    </form>
  );

};

export default Form;
