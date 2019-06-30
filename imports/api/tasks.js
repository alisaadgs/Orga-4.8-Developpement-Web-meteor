import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'; 


import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
 	  const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      // make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    const task = Tasks.findOne(taskId);
    if (task.owner !== Meteor.userId()) {
      // make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
    Tasks.update(taskId, {
    	$set: { checked: setChecked } 
 	  });
  },
});

Schema = {};
Schema.Tasks =new SimpleSchema({
    owner:{
      type: String,
      max: 200,
      autoform: {
            omit: true
      }
    },
    username:{
      type: String,
      max: 200,
      autoform: {
            omit: true
      }
    },
    text:{
      type: String,
      label: "Texte du todo : ",
      max:200,
      autoform: {
        afFieldInput: { // Modification du champs dans le formulaire
          type: "textarea"
        }
      }
    },
    checked:{
      type: Boolean,
      optional: true,
      autoValue : false,
      autoform: {
            omit: true
      }
    },
    
    createdAt:{
      type: Date,
      denyUpdate: true,
      autoValue: function () {
        if (this.isInsert) {
          return new Date;
        } else {
          this.unset();
        }
      },
      autoform: {
            omit: true
      }
    }
});

Tasks.attachSchema(Schema.Tasks);