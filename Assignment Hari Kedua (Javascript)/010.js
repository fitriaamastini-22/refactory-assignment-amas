function caesarCipher(str, shift){
	let res = '';
    for ( i in str ){
    	let unicode = str.charCodeAt(i);
        
        let res_alp = '';
        let is_cap  = true;
        if (unicode >= 65 && unicode <= 90){
            res_alp = unicode - 65;
        }
        else if (unicode >= 97 && unicode <= 122){
            res_alp = unicode - 97;
            is_cap = false;
        }
        else{
            res += str[i]
            continue;
        }
        
        let res_shift_alp=0;
        if( shift > 0){
        	res_shift_alp = res_alp + shift;
            res_shift_alp = res_shift_alp % 26;
        }
        else{
        	res_shift_alp = res_alp + shift;
            if( res_shift_alp >= 0){
            	res_shift_alp = Math.abs(res_shift_alp % 26);
            }
            else{
                do{
                	res_shift_alp = 26 + res_shift_alp;
                }while(res_shift_alp < 0 );
            }
        }
        
        if (is_cap){
            res_shift_alp += 65;
        }
        else{
            res_shift_alp += 97;
        }
            
        res += String.fromCharCode(res_shift_alp);         
    }
    
    return res;
}

document.write(caesarCipher("I love JavaScript!", 100)  ); 
document.write("<br/>");
document.write(caesarCipher("I love JavaScript!", -100)  ); 
document.write("<br/>");