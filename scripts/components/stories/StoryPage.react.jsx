var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var StoryStore = require('../../stores/StoryStore.react.jsx');
var StoryActionCreators = require('../../actions/StoryActionCreators.react.jsx');
var State = require('react-router').State;

var StoryPage = React.createClass({
  
  mixins: [ State ],

  getInitialState: function() {
    return { 
      story: StoryStore.getStory(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    StoryStore.addChangeListener(this._onChange);
    StoryActionCreators.loadStory(this.getParams().storyId);
  },

  componentWillUnmount: function() {
    StoryStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      story: StoryStore.getStory(),
      errors: StoryStore.getErrors()
    }); 
  },
  
  render: function() {
    return (
      <div className="row">
        <div className="story__title">{this.state.story.title}</div>
        <div className="story__body">{this.state.story.body}</div>
        <div className="story__user">{this.state.story.user.username}</div>
      </div>
     );
  }

});

module.exports = StoryPage;

