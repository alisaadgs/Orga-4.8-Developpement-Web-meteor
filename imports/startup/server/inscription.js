Accounts.validateNewUser(function(user) {
	//Initialisation des variables
		var allIsGood=true;
		var firstname = user.profile.firstname;
		var lastname = user.profile.lastname;
		var sexe = user.profile.sexe;
		var birthday = user.profile.birthday;
		var username = user.username;
		var email = user.emails[0].address;
    // Tests côté server
    	if(firstname.length<3){
			console.log('prenom trop cours');
			allIsGood=false;
		}
		if(['M','F','O'].indexOf(sexe)<0){
			console.log('problème de sexe');
			allIsGood=false;
		}
		if(!isEmailValid(email)){
			console.log('email invalide');
			allIsGood=false;
		}
	if (allIsGood) {
		return true;
	} else {
		throw new Meteor.Error(500, "Veuillez donner une adresse email valide");
	}
});

function isEmailValid(email) {
	var tmp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email);
	return tmp;
};