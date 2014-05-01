function User(id, firstName, lastName) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
};

module.exports = {
	UserRepository: function() {
		this.users = [];
	
		this.createUsers = function() {
			var numberOfUsers = 10;
			for( var i=0; i < numberOfUsers; i++ ){
				var id = i + 1;
				this.users.push( new User(id, 'John ' + id, 'Doe ' + id ));
			}
			console.log('# users : ' + this.users.length);
			return this.users;
		};
	
		this.getMaxUserId = function() {
			return Math.max.apply ( Math, this.users.map(function(user){
				return this.users.id;
			}));
		};
	
		this.getNumberOfUsers = function(){
			return this.users.length;
		};
	
		this.getAll = function() {
			return this.users;
		};
	
		this.getById = function(id) {
			var foundUser = false;
			for( var i=0; i < this.users.length; i++ ){
				var user = this.users[i];
				if ( typeof user !== undefined && user.id == id ){
					foundUser = true;
					return user;
				}
			}
			if ( !foundUser ){
				return 'User with id ' + id + ' not found.';
			}
		};
	
		this.addNewUser = function(firstName, lastName ){
			var newUser = new User(this.getMaxUserId() + 1, firstName, lastName );
			this.users.push( newUser );
			return this.getById( newUser.id );
		};
	
		this.changeUser = function( id , firstName, lastName ){
			var user = this.getById( id );
			user.firstName = firstName;
			user.lastName = lastName;
			return user;
		};
	
		this.deleteUser = function(id){
			this.users.splice(id, 1 );
		};
	}
};