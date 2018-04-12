import React from 'react';

import RivaeDeleteButton from '../../assets/styledComponents/RivaeDeleteButton';

const DeleteButton = ({className, onClick, type}) => {
  return(
    <RivaeDeleteButton className={className} onClick={onClick} type={type}>
      <i className="fas fa-trash"></i>
    </RivaeDeleteButton>
  );
};

export default DeleteButton;
