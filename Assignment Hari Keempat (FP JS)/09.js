const fs = require('fs');

const rawdata = fs.readFileSync('order.json');
const orders = JSON.parse(rawdata);

// const formatDate = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
// console.log(orders);
// console.log(orders[0].items);

//Find all purchases made in February.
const searchByDate = "february";

const filterByDate = order =>{
  // const created_at =  Date.parse(order.created_at);
  const month_num = Number(order.created_at.split("T")[0].split("-")[1]);
  let month = '';
  switch (month_num) {
    case 1:
      month = 'january';
      break;
      case 2:
        month = 'february';
        break;
        case 3:
          month = 'march';
          break;
          case 4:
            month = 'april';
            break;
            case 5:
              month = 'mei';
              break;
              case 6:
                month = 'june';
                break;
                case 7:
                  month = 'july';
                  break;
                  case 8:
                    month = 'august';
                    break;
                    case 9:
                      month = 'september';
                      break;
                      case 10:
                        month = 'october';
                        break;
                        case 11:
                          month = 'november';
                          break;
                          case 12:
                            month = 'december';
                            break;
  }
  return month.toLowerCase() === searchByDate.toLowerCase() ;
}
const februaryPurchases = orders.filter(filterByDate);

console.log(februaryPurchases);

const searchByName = "Ari";
// Find all purchases made by Ari, and add grand total by sum all total price of items. The output should only a number.

const getPurchasesByName = (orders, name) =>{
  const purchasesorder = orders.filter(order => order.customer.name.toLowerCase() === name.toLowerCase());
  const sum = purchasesorder.reduce( (acc,order) =>{
    let total = 0;
    let items = order.items;
    items.forEach( item =>{
      total += (item.qty * item.price);
    });

    return acc + total;
  }, 0);

  return sum;
}

const grandTotalPurchasesByAri = getPurchasesByName(orders, searchByName); //17352400
console.log(grandTotalPurchasesByAri);


// Find people who have purchases with grand total lower than 300000. The output is an array of people name. Duplicate name is not allowed.
const filterByGrandTotalLowerThan = (orders,maxGrandTotal) =>{
  const arr_names = [];
  orders.map(order => {
    if(!arr_names.includes(order.customer.name)) {
      arr_names.push(order.customer.name);
    }
  });
  // console.log(arr_names);
  let arr_grandTotal = {};

  for(let name of arr_names){
    let grandtotal = getPurchasesByName(orders, name);
    arr_grandTotal[name] = grandtotal;
  }

  let arr_filter = [];

  for(let name of arr_names){
    if(arr_grandTotal[name] <= maxGrandTotal){
      arr_filter.push(name);
    }
  }

  // console.log(arr_grandTotal);
  // console.log(arr_filter);

  return arr_filter;
}

const maxGrandTotal = 300000;
const getNameByGrandTotal = filterByGrandTotalLowerThan(orders, maxGrandTotal);
console.log(getNameByGrandTotal);