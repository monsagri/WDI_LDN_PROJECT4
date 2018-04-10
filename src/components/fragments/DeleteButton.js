import React from 'react';

const DeleteButton = ({className, onClick, type}) => {
  return(
    <button className={className} onClick={onClick} type={type}>
      <i className="fas fa-trash"></i>
    </button>
  );
};

export default DeleteButton;
