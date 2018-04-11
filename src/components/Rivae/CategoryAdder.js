import React from 'react';

const CategoryAdder = ({toggled, openCategory, newCategoryChange, newCategorySave}) => {
  return (<div>
    {toggled &&
    <div>
      <input
        type="text"
        name={'newCategory'}
        onChange={newCategoryChange}
      />
      <button className="button" type="button" onClick={newCategorySave}>Save Category</button>
    </div>
    }
    <button className="button" type="button" onClick={openCategory}>
      {toggled
        ? <span>Undo</span>
        : <span>Add a Category</span>
      }
    </button>
  </div>);
};

export default CategoryAdder;
