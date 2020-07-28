function maxCharacter(str){
	let dict = {};
    for( chr of str){
        if(dict[chr]){
        	dict[chr]++;
        }
        else{
        	dict[chr] = 1;
        }
    }
    
    let sortable = [];
	for (let chr in dict) {
    	sortable.push([chr, dict[chr]]);
	}
    
    sortable.sort((a, b) => { return b[1] - a[1]; });

    return sortable[0][0];
}

document.write(maxCharacter('Hello World')); 