class Auth{
	static _users = [
		{ userid: 1, username : 'root', password: 'secret', is_login: false, last_login: null},
		{ userid: 2, username : 'amas', password: 'apaya', is_login: false, last_login: null},
		{ userid: 3, username : 'samatoki', password: 'mrhardcore', is_login: false, last_login: null},
		{ userid: 4, username : 'juto', password: 'mrdirtycop45', is_login: false, last_login: null},
		{ userid: 5, username : 'riou', password: 'navysolider2die4', is_login: false, last_login: null}
		];

	static _currentuser = null;

	// static get currentuser(){
	// 	return this._currentuser;
	// }

	// static set currentuser(index){
	// 	this._currentuser = index;
	// }

	static getIndexofUser(userl){
		return this._users.findIndex( user => user.username === userl.username && user.password === userl.password  );
	}

	static validate(userl){
		let index = this.getIndexofUser(userl);

		if(index < 0){
			return false;
		}

		return true;
	}

	static login(userl){
		if ( this.validate(userl) ){
			this._currentuser = this.getIndexofUser(userl);
			this._users[this._currentuser].is_login = true;
			this._users[this._currentuser].last_login = new Date().toLocaleString();
			return true;
		}
		
		return false;
	}

	static user(){
		return this._users[this._currentuser];
	}

	static id(){
		return this._users[this._currentuser].userid;
	}

	static check(){
		if ( this._currentuser !== null ) {
			return true;
		}

		return false;
	}

	static guest(){
		if ( this._currentuser === null ) {
			return true;
		}

		return false;
	}

	static lastLogin(){
		return this._users[this._currentuser].last_login;
	}

	static logout(){
		this._users[this._currentuser].last_login = false;
		this._currentuser = null;
		return true;
	}
}


console.log( Auth.validate({username: 'root', password: 'secret'}) );   // Just verify username and password without log in.

console.log( Auth.login( {username: 'root', password: 'secret'} ) );      // If valid, user will log in.

console.log( Auth.user() );           // Get information about current logged in user.

console.log( Auth.id() );             // Get the User ID.

console.log( Auth.check()  );         // Will returns true if user already logged in.

console.log( Auth.lastLogin() ) ;      // Get information when the user last logged in.

Auth.logout();         // Log out the current logged in user.

Auth.guest()           // Will returns true if user not logged in.

