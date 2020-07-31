const rows = [];

for(let i = 0; i <= 1000; i++){
	rows.push(i);
}

console.log(rows);

console.log(rows.filter((row) => row % 2 == 0)); // Even
console.log(rows.filter((row) => row % 2 != 0)); // Odd
console.log(rows.filter((row) => row % 5 == 0)); // Number Multiplied by 5
console.log(rows.filter((row) => {
	if (row<=1)
	{
	  return false;
	}
	else if(row === 2)
	{
	  return true;
	}else
	{
	  for(let x = 2; x < row; x++)
	  {
	    if(row % x === 0)
	    {
	      return false;
	    }
	  }
	  return true;  
	}
})); // Prime Number
console.log(rows.filter((row) => {
	if ( row <= 100){
		if (row<=1)
		{
		  return false;
		}
		else if(row === 2)
		{
		  return true;
		}else
		{
		  for(let x = 2; x < row; x++)
		  {
		    if(row % x === 0)
		    {
		      return false;
		    }
		  }
		  return true;  
		}
	}

	return false;
})); // Prime Number less than 100