import React from 'react';

class CSVReader extends React.Component {

  // component is constructed here
  constructor() {
    super();

    // HTML5 gives us the FileReader constructor
    this.fileReader = new FileReader();
    // onload is triggered when reading has been successfully complete
    // find out the result of the reading using the handleChange function in app.js
    this.fileReader.onload = () => this.props.handleChange(this.fileReader.result);
  }

  handleChange = (e) => {
    // the first of either the files or dataTransfer (cross-browser), as this component can only handle one image
    const file = (e.target.files || e.dataTransfer.files)[0];
    // provides data: image type - the type used in my API
    this.fileReader.readAsText(file);
  }


  componentDidMount() {
    // componentDidMount happens after render, so the element will be available here
    this.input.addEventListener('change', this.handleChange);

    // prevent default to avoid loading file straight into the browser
    this.dropzone.addEventListener('dragenter', (e) => e.preventDefault());
    this.dropzone.addEventListener('dragover', (e) => e.preventDefault());

    this.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      // handleChange takes e and does the readings
      this.handleChange(e);
    });
  }

  render() {
    return (
      <div>
        {/* only accepts images */}
        <input type="file" accept="text/csv" ref={element => this.input = element}/>
        <button onClick={this.props.passCSV}>Submit</button>
        <div
          className="dropzone"
          // ref gets javascript element, like document getElementBy
          ref={element => this.dropzone = element}
        >
          {this.props.text && <pre>{this.props.text}</pre>}
        </div>
      </div>
    );
  }
}

export default CSVReader;
