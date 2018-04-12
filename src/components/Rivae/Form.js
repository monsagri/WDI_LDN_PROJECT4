import React from 'react';

import RivaeSubmitButton from '../../assets/styledComponents/RivaeSubmitButton';

const Form = ({ handleSubmit, handleChange, data}) => {
  console.log(data);
  return (

    <form onSubmit={handleSubmit}>
      <h1 className="title is-1">Correct your Transaction</h1>
      <div className="field">
        <label htmlFor="date">Date</label>
        <input className="input"
          value={data.date}
          name="date"
          onChange={handleChange}
          type="date"
          required="true"
        />
        {data.errors.date && <small>{data.errors.date}</small>}
      </div>
      <div className="field">
        <label htmlFor="amount">Amount</label>
        <input className="input"
          value={data.amount}
          name="amount"
          onChange={handleChange}
          type="number"
          required="true"
        />
        {data.errors.amount && <small>{data.errors.amount}</small>}
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <input className="input"
          value={data.category}
          name="category"
          onChange={handleChange}
          required="true"
        />
        {data.errors.category && <small>{data.errors.category}</small>}
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <input className="input"
          value={data.description}
          name="description"
          onChange={handleChange}
          placeholder="Name of Payee, etc."
          required="true"
        />
        {data.errors.description && <small>{data.errors.description}</small>}
      </div>
      <RivaeSubmitButton className="button">Submit</RivaeSubmitButton>
    </form>
  );

};

export default Form;
