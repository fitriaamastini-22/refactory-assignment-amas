function sort(data){
	return data.slice(0).sort();
}

function reverse(data){
    return data.slice(0).reverse();
}

function splice(data, idx, val){
	let newdata = data.slice(0);
    newdata.splice(idx, 0, val)
	return newdata;
}

const data = new Array(4, 2, 1, 3, 5);
document.write(sort(data));

document.write("<br/>");
document.write(reverse(data));

document.write("<br/>");
document.write(splice(data, 3, 6));
