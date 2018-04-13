import React from 'react';

import MoneymapperSubmitButton from '../../assets/styledComponents/MoneymapperSubmitButton';
import MoneymapperCancelButton from '../../assets/styledComponents/MoneymapperCancelButton';
import MoneymapperButton from '../../assets/styledComponents/MoneymapperButton';

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
      <MoneymapperSubmitButton className="button" type="button" onClick={newCategorySave}>Save Category</MoneymapperSubmitButton>
    </div>
      }
      {toggled
        ? <MoneymapperCancelButton className="button" type="button" onClick={openCategory}>
        Undo
        </MoneymapperCancelButton>
        : <MoneymapperButton className="button" type="button" onClick={openCategory}>
        Add a Category
        </MoneymapperButton>
      }
    </div>);
};

export default CategoryAdder;
