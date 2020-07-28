function reverse(str){
    return str.split("").reverse().join("");
}

document.write(reverse(`Hello World!`));
document.write("<br/>");
document.write(reverse(`Welcome World`));