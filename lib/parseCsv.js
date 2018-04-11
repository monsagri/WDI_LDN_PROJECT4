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
      console.log('done parsing csv');
    });

  return csvInput;
}

function parseMonzoStringCsv(csvString) {
  const csvInput = [];
  const cleanedString = csvString.replace(/'/g, '');


  csv
    .fromString(cleanedString, {headers: true})
    .on('data', function(data){
      data.date = data.created.substring(0,10);
      data.amount = data.amount.replace(/,/g, '');
      data.local_amount = data.local_amount.replace(/,/g, '');
      csvInput.push(data);
    })
    .on('end', function(){
      console.log('done parsing csv');
    });

  return csvInput;
}

module.exports = {
  monzo: parseMonzoCsv,
  monzoString: parseMonzoStringCsv
};
