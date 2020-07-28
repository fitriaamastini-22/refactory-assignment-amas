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

document.write(palindrome("Cigar? Toss it in a can. It is so tragic")); // output true
document.write("<br/>");
document.write(palindrome("Hello World")); // output false