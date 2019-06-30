import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import '../html/group.html';

Template.group.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});


Template.group.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('groups.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('groups.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('groups.setPrivate', this._id, !this.private);
  },
});