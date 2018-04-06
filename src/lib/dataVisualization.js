function absoluteGraphData (dataObject) {
  return Object.entries(dataObject)
    .map(entry => Object.assign( { x: entry[0], y: Math.abs(entry[1]) }));
}

function graphData (dataObject) {
  return Object.entries(dataObject)
    .map(entry => Object.assign( { x: entry[0], y: entry[1] }));
}

export default {
  absoluteGraphData: absoluteGraphData,
  graphData: graphData
};
