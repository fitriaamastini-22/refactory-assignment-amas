const fs = require('fs')

const readDir = (path) => {
	return new Promise((resolve, reject) =>{
		fs.readdir(path, (err, result) => {
		  if (err) {
		    reject(err) ;
		  }
		  resolve(result);
		})
	})
} ;

function errorHandler(err) {
   throw new Error(err.message);
}
function successHandler(result) {
   console.log(result);
}

readDir('/').then(successHandler).catch(errorHandler);
