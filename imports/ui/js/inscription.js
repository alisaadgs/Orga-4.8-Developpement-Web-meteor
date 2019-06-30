import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check';

import '../html/inscription.html';

Template.inscription.events({
	'submit #form_signup': function (event) {
		//On bloque l'action "standard" du submit
		event.preventDefault();
		// Initialisation des variables
		var target = event.target
		var firstname = target.firstname.value;
		var lastname = target.lastname.value;
		var sexe = target.sexe.value;
		var birthday = target.birthday.value;
		var username = target.username.value;
		var email = target.email.value;
		var password = target.password.value;
		var passwordConf = target.passwordConf.value;
		var allIsGood = true;
		// Check des variables
		check(firstname, String);
		check(lastname, String);
		check(sexe, String);
		//check(birthday, Date);
		check(username, String);
		check(email, String);
		check(password, String);
		check(passwordConf, String);
		// Testes sur les variables
		if (firstname.length < 2) {
			Materialize.toast('prenom trop cours', 4000);
			allIsGood = false;
		}
		if (['M', 'F', 'O'].indexOf(sexe) < 0) {
			Materialize.toast('problème de sexe', 4000);
			allIsGood = false;
		}
		if (!isEmailValid(email)) {
			Materialize.toast('email invalide', 4000);
			allIsGood = false;
		}
		if (password == null || password == '') {
			Materialize.toast('problème mot de passe', 4000);
			allIsGood = false;
		}
		if (password != passwordConf) {
			Materialize.toast('erreur sur la confirmation de mot de passe', 4000);
			allIsGood = false;
		}
		// Création de l'utilisateur
		if (allIsGood) {
			Accounts.createUser({
				username: username,
				password: password,
				email: email,
				profile: {
					firstname: firstname,
					lastname: lastname,
					sexe: sexe,
					birthday: birthday
				}
			}, function (error) {
				if (error) {
					Materialize.toast(error, 4000);
				} else {
					Router.go('home');
				}
			});
		}
	}
});

// Validation Rules

// Trim Helper
var trimInput = function (val) {  // securite: enlever les x-teres speciaux pour proteger nos formulaires
	return val.replace(/^\s*|\s*$/g, "");
}

// verifier si la variable est vide
var isEmailValid = function (val) {
	if (val && val != '') {
		return true;
	}
	// Bert.alert("Veuillez remplir tout les champs SVP", "danger", "growl-top-right");
	// Materialize.toast("Veuillez remplir tout les champs SVP", 4000);
	return false;
}

// Valider l'Email
var isEmail = function (value) {
	var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (filter.test(String(value).toLowerCase())) {
		return true;
	}
	Bert.alert("L'adresse email n'est pas valide.", "danger", "growl-top-right");
	return false;
}

// Verifier le mot de passe
isValidPassword = function (password) {
	if (password.length < 6) {
		Bert.alert("Le mot de passe doit contenire au moins 6 caractères", "danger", "growl-top-right");
		return false;
	}
	return true;
}

// 2eme verification du mot de passe
areValidPassords = function (password, confirm) {
	if (!isValidPassword(password)) {
		return false;
	}
	if (password !== confirm) {
		Bert.alert("Les 2 mots de passe de correspondent pas", "danger", "growl-top-right");
		return false;
	}
	return true;
}