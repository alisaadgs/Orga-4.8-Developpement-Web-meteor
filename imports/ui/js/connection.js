import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check'; 

import '../html/connection.html';

Template.connection.events({
	'submit form': function(event, template) {
		event.preventDefault();

		var emailVar = template.find('#login-email').value;
		var passwordVar = template.find('#login-password').value;

		Meteor.loginWithPassword(
			emailVar,
			passwordVar,
			function(error) {
				if (error) { 
					Materialize.toast(error, 4000);
				} else {
					Router.go('home');
				}
			}
		);
	}
});