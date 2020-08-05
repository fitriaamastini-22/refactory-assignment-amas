const iterationfunc = () => {
	return new Promise((resolve, reject) => {
		for (let i = 1; i <= 3; i++) {
		  setTimeout(() => {
		      console.log(i);
		      if( i === 3 ){
		      	resolve();
		      }
		  }, 1000);
		}
	});
}

iterationfunc().then(function() {
  console.log('Done');
});
