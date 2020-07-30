function palindrome(str){
    str = str.replace(/[^a-zA-Z]/g,"").toLowerCase();
    
    let reverse_text = str.split("").reverse().join("");
    
    if( str === reverse_text){
        return true;
    }
    else{
        return false;
    }
}

console.log(palindrome("Cigar? Toss it in a can. It is so tragic")); // output true

console.log(palindrome("Hello World")); // output false