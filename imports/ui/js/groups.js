import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Groups } from '../../api/groups.js';

import '../js/group.js';
import '../html/profile.html';

Template.profile.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('groups');
});

Template.profile.helpers({
  groups() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter groups
      return Groups.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }

    if (instance.state.get('showAllGroups')) {
      // If show all groups is checked
      return Groups.find({ }, { sort: { createdAt: -1 } });
    }

    // Otherwise, return all of the groups
    return Groups.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Groups.find({ checked: { $ne: true } }).count();
  },
});

Template.profile.events({
  'submit .new-group'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a group into the collection
    Meteor.call('groups.insert', text, function (err, id) {
      if (err) {
        $(".erreurs").append(err.reason);
        $(".erreurs").css("display", "block");
      }
      else {
        // Clear form
        target.text.value = '';
      }
    });
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
  'change .showAll-Groups input'(event, instance) {
    instance.state.set('showAllGroups', event.target.checked);
  },
});