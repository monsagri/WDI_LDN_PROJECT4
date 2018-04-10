var csv = require('fast-csv');

function parseMonzoCsv(url) {
  const csvInput = [];

  csv
    .fromPath(`${url}`, {headers: true})
    .on('data', function(data){
      data.date = data.created.substring(0,10);
      data.amount = data.amount.replace(/,/g, '');
      data.local_amount = data.local_amount.replace(/,/g, '');
      csvInput.push(data);
    })
    .on('end', function(){
      console.log('done');
      console.log(csvInput);
    });
  return csvInput;
}

module.exports = {
  monzo: parseMonzoCsv
};
