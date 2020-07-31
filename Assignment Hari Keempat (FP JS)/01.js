const palindrome = (str) => {
	str = str.replace(/[^a-zA-Z]/g,"").toLowerCase();
	
	let reverse_text = str.split("").reverse().join("");
	
	if( str === reverse_text){
	    return true;
	}
	else{
	    return false;
	}
}

console.log(palindrome("ibu ratna antar ubi"));
console.log(palindrome("kasur ini rusak"));
console.log(palindrome("A nut for a jar of tuna."));
console.log(palindrome("Borrow or rob?"));
console.log(palindrome("Was it a car or a cat I saw?"));
console.log(palindrome("Yo, banana boy!"));
console.log(palindrome("UFO tofu?"));
