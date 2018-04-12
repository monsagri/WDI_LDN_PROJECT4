import React from 'react';

import InputTable from '../../assets/styledComponents/InputTable';
import RivaeSubmitButton from '../../assets/styledComponents/RivaeSubmitButton';
import RivaeDeleteButton from '../../assets/styledComponents/RivaeDeleteButton';

const Form = ({ handleSubmit, handleChange, data, display, toggle}) => {
  console.log(data);
  if(!display) return null;
  return (

    <form onSubmit={handleSubmit}>
      <InputTable>
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
              <RivaeSubmitButton className="button">Submit</RivaeSubmitButton>
            </td>
            <td>
              <RivaeDeleteButton
                className="button"
                type="button"
                onClick={toggle}>Cancel</RivaeDeleteButton>
            </td>
          </tr>
        </tbody>
      </InputTable>
    </form>
  );

};

export default Form;
