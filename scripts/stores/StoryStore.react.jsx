var SmallAppDispatcher = require('../dispatcher/SmallAppDispatcher.js');
var SmallConstants = require('../constants/SmallConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = SmallConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _stories = [];
var _errors = [];
var _story = { title: "", body: "", user: { username: "" } };

var StoryStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllStories: function() {
    return _stories;
  },

  getStory: function() {
    return _story;
  },

  getErrors: function() {
    return _errors;
  }

});

StoryStore.dispatchToken = SmallAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    
    case ActionTypes.RECEIVE_STORIES:
      _stories = action.json.stories;
      StoryStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_STORY:
      if (action.json) {
        _stories.unshift(action.json.story);
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      StoryStore.emitChange();
      break;
    
    case ActionTypes.RECEIVE_STORY:
      if (action.json) {
        _story = action.json.story;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      StoryStore.emitChange();
      break;
  }

  return true;
});

module.exports = StoryStore;

