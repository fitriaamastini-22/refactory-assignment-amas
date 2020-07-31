const csv = require('./plugin/node_modules/csv-parser');
const fs = require('fs');
const datas = [];
fs.createReadStream('products.csv')
  .pipe(csv())
  .on('data', (row) => {
    // console.log(row);
    row.PRICE = Number(row.PRICE);
    datas.push(row);
  })
  .on('end', () => {
    // console.log('CSV file successfully processed');
    // console.log(datas);

    const sorted_datas = datas.sort((a, b) => a.PRICE - b.PRICE);

   	console.log(sorted_datas);
  });
