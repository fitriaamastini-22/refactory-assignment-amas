function capitalize(str){
	str = str.toLowerCase();
    return str.split(" ").map(str1 => str1[0].toUpperCase()+str1.slice(1) ).join(" ");
}

console.log(capitalize('hello world') ); 