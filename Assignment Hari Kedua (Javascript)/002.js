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
document.write(indexOf(data, 3));

document.write("<br/>");
document.write(lastIndex(data));

document.write("<br/>");
document.write(includes(data, 6));
document.write("<br/>");
document.write(includes(data, 5));

document.write("<br/>");
document.write(fill(data, 3));

document.write("<br/>");
document.write(join(data, '-'));

document.write("<br/>");
document.write(sum(data));