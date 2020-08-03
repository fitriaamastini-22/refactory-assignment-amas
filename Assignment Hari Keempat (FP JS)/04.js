

const leapYear = (year1, year2) =>{
	let str = '';
	for (let year = year1; year <= year2; year++){
	    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
	        str += `${year} is Leap Year\r\n`;
	    }
	    else{
	        str += `${year} is not Leap Year\r\n`;
	    }
	}
	return str;
}


console.log(leapYear(2000,2020)); // output true