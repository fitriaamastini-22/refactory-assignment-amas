function fizzBuzz(num){
	for( let i = 1; i <= num; i++){
    	if( i % 2 === 0 && i % 3 === 0){
        	document.write("Fizz Buzz<br/>");
        }
        else if( i % 2 === 0){
        	document.write("Fizz<br/>");
        }
        else if( i % 3 === 0){
        	document.write("Buzz<br/>");
        }
        else{
        	document.write(i+"<br/>");
        }
    }
}

fizzBuzz(30); 