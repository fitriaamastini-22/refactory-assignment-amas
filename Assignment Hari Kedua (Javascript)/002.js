function indexOf(data, val){
	return data.indexOf(val);
}

function lastIndex(data){
	return (data.length-1);
}

function includes(data, val){
	return data.includes(val);
}

function fill(data, val){
	return data.slice(0).fill(val);
}

function join(data, sep){
	return data.join(sep);
}

function sum(data){
	return data.reduce((acc, val) => acc + val);
}

const data = new Array(1,2,3,4,5);
console.log(indexOf(data, 3));

console.log(lastIndex(data));

console.log(includes(data, 6));

console.log(includes(data, 5));

console.log(fill(data, 3));

console.log(join(data, '-'));

console.log(sum(data));