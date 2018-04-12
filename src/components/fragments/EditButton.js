import React from 'react';

import RivaeEditButton from '../../assets/styledComponents/RivaeEditButton';

const EditButton = ({className, onClick, type}) => {
  return(
    <RivaeEditButton className={className} onClick={onClick} type={type}>
      <i className="fas fa-edit"></i>
    </RivaeEditButton>
  );
};

export default EditButton;
