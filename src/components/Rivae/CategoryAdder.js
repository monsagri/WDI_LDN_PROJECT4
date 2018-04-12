import React from 'react';

import RivaeSubmitButton from '../../assets/styledComponents/RivaeSubmitButton';
import RivaeDeleteButton from '../../assets/styledComponents/RivaeDeleteButton';
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
        ? <RivaeDeleteButton className="button" type="button" onClick={openCategory}>
        Undo
        </RivaeDeleteButton>
        : <RivaeButton className="button" type="button" onClick={openCategory}>
        Add a Category
        </RivaeButton>
      }
    </div>);
};

export default CategoryAdder;
