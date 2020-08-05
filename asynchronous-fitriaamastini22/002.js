const axios = require('axios');

const url_users = 'https://jsonplaceholder.typicode.com/users';
const url_posts = 'https://jsonplaceholder.typicode.com/posts';


// axios(url_user)
//   .then(response => {
//     const html = response.data;
//     console.log(html);
//   })
//   .catch(console.error);

const requestOne = axios.get(url_users);
const requestTwo = axios.get(url_posts);

axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
  const responseOne = responses[0];
  const responseTwo = responses[1];

  // console.log(responseOne);

  const users  = responseOne.data;
  // console.log(users);

  const posts  = responseTwo.data;
  // console.log(posts);

  for(index in posts){
  	let userid = posts[index].userId;
  	// let userid = 100;
  	let found_user = users.find(user => user.id == userid);
  	if (typeof found_user != 'undefined'){
  		posts[index].user = found_user;
  	}
  	// console.log(posts[index]);
  	// break;
  }

  console.log(posts);

})).catch(errors => {
  throw new Error(errors.message);
})