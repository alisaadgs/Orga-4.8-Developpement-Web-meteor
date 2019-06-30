import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../../api/tasks.js'

import '../js/task.js';
import '../html/tasks.html';


Template.tasks.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.tasks.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      // If hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.tasks.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    Meteor.call('tasks.insert', text, function (err, id) {
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
});















import '../html/profile.html';
Template.profile.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.profile.helpers({
  tasks() {
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    },
});