import React from 'react';

import MoneymapperEditButton from '../../assets/styledComponents/MoneymapperEditButton';

const EditButton = ({className, onClick, type}) => {
  return(
    <MoneymapperEditButton className={className} onClick={onClick} type={type}>
      <i className="fas fa-edit"></i>
    </MoneymapperEditButton>
  );
};

export default EditButton;
