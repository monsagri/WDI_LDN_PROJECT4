import React from 'react';

import RivaeSubmitButton from '../../assets/styledComponents/RivaeSubmitButton';
import RivaeCancelButton from '../../assets/styledComponents/RivaeCancelButton';
import RivaeButton from '../../assets/styledComponents/RivaeButton';

const CategoryAdder = ({toggled, openCategory, newCategoryChange, newCategorySave}) => {
  return (
    <div>
      {toggled &&
    <div>
      <input
        className="button"
        type="text"
        name={'newCategory'}
        onChange={newCategoryChange}
      />
      <RivaeSubmitButton className="button" type="button" onClick={newCategorySave}>Save Category</RivaeSubmitButton>
    </div>
      }
      {toggled
        ? <RivaeCancelButton className="button" type="button" onClick={openCategory}>
        Undo
        </RivaeCancelButton>
        : <RivaeButton className="button" type="button" onClick={openCategory}>
        Add a Category
        </RivaeButton>
      }
    </div>);
};

export default CategoryAdder;
