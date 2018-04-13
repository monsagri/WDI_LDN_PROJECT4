import React from 'react';

import MoneymapperDeleteButton from '../../assets/styledComponents/MoneymapperDeleteButton';

const DeleteButton = ({className, onClick, type}) => {
  return(
    <MoneymapperDeleteButton className={className} onClick={onClick} type={type}>
      <i className="fas fa-trash"></i>
    </MoneymapperDeleteButton>
  );
};

export default DeleteButton;
