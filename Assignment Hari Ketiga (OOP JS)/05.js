const fs = require('fs');

class Cart{
	constructor(){
		this.items = [];
		this.discount = '';
	}

	addItem(item){
		if (typeof item.quantity === 'undefined') {
		  item.quantity = 1;
		}
		this.items.push(item);

		return this;
	}

	removeItem(ritem){
		let index = this.items.findIndex( item => item.item_id === ritem.item_id );

		this.items.splice(index, 1);

		return this;
	}

	addDiscount(discount){
		discount = discount.replace("%","");
		this.discount = Number(discount);

		this.items.forEach( item => item.price);

		return this;
	}

	totalItems(){
		return this.items.length;
	}

	totalQuantity(){
		//return this.items.reduce( (acc,item) => ({quantity: acc.quantity + item.quantity}) );
		return this.items.reduce( (acc,item) => { return acc + item.quantity } , 0 );
	}

	totalPrice(){
		let total_price = this.items.reduce( (acc,item) => { return acc + (item.price*item.quantity) } , 0 );

		return total_price * (100-this.discount)/100
	}

	showAll(){
		let str_item = this.items.reduce( (a, item) => { 
			return a+=`Item ID ${item.item_id} : ${item.price} x ${item.quantity} (Discount = ${this.discount}% ) = ${ (item.price*item.quantity) * (100-this.discount)/100} \r\n`; 
		}, '' );
		return str_item;
	}

	checkout(){
		let str_item = this.showAll();

		const total_items = this.totalItems();
		const total_quantity = this.totalQuantity();
		const total_price = this.totalPrice();

		str_item += `Total Items    : ${total_items}\r\n`;
		str_item += `      Quantity : ${total_quantity}\r\n`;
		str_item += `      Price    : ${total_price} ((Discount ${this.discount}% )`;
		  
		// Write data in 'Output.txt' . 
		fs.writeFile('checkout.txt', str_item, (err) => { 
		    // In case of a error throw err. 
		    if (err) throw err; 
		});
	}
}

const cart = new Cart();


// Do some chainings
cart.addItem({ item_id: 1, price: 30000, quantity: 3 })
    .addItem({ item_id: 2, price: 10000 })               // By default quantity is 1
    .addItem({ item_id: 3, price: 5000, quantity: 2 })
    .removeItem({item_id: 2})
    .addItem({ item_id: 4, price: 400, quantity: 6 })
    .addDiscount('50%');

console.log(cart.totalItems()) // 3


console.log(cart.totalQuantity()) // 11

console.log(cart.totalPrice()) // 51200

console.log(cart.showAll()) // Show all items in cart

cart.checkout() // Store data in a file