function User(firstName, lastName, email, password) {  
    this.firstName = firstName || null;
    this.lastName = lastName || null;
    this.email = email || null;
    this.password = password || null;
}

module.exports = User;