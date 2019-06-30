import { Meteor } from 'meteor/meteor';
import './layout1.html';

Template.layoutOne.events({
	"click #sign_out"(event){
		Meteor.logout();
	},
});