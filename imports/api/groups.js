import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'; 


import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const Groups = new Mongo.Collection('groups');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('groups', function tasksPublication() {
    return Groups.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'groups.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a group
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Groups.insert({
      text,
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'groups.remove'(taskId) {
    check(taskId, String);
    const group = Groups.findOne(taskId);
    if (group.owner !== Meteor.userId()) {
      // If the group is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }
    Groups.remove(taskId);
  },
  'groups.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    const group = Groups.findOne(taskId);
    if (group.owner !== Meteor.userId()) {
      // If the group is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
    Groups.update(taskId, {
      $set: { checked: setChecked } 
    });
  },
  'groups.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
 
    const group = Groups.findOne(taskId);
 
    // Make sure only the group owner can make a group private
    if (group.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Groups.update(taskId, { $set: { private: setToPrivate } });
  },
});

Schema = {};
Schema.Groups =new SimpleSchema({
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
    private:{
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

Groups.attachSchema(Schema.Groups);