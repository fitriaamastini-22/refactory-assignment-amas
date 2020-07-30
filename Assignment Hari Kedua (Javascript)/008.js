function anagram(str1, str2){
	str1 = str1.replace(/[^a-zA-Z]/g,"");
    str2 = str2.replace(/[^a-zA-Z]/g,"");
    
    if (str1.length !== str2.length){
    	return false;
    }
    else{
    	let arr_chr = str2.split("");
    	for(let chr1 of str1){
        	for(let idx in arr_chr){
            	if(chr1 === arr_chr[idx]){
                	arr_chr.splice(idx,1);
                    break;
                }
            }
        }
        
        if(arr_chr.length > 0){
        	return false;
        }
        
        return true;
    }
}

console.log(anagram('hello world', 'world hello') ); 

console.log(anagram('hellow world', 'hello there') ); 

console.log(anagram('hellow world', 'hello there!') ); 
//document.write("<br/>");
//document.write(anagram('hello world', 'older whlol'));