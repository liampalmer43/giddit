var React = require('react');
var PostStore = require('../stores/PostStore');
var PostConstants = require('../constants/PostConstants');
var PostActions = require('../actions/PostActions');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var Post = require('./Post.react');

function getState() {
    return {
        posts: PostStore.getState()
    };
}

var Posts = React.createClass({

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function() {
        PostStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        PostStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var posts = this.state.posts;

        var postViews = [];
        for (var i = 0; i < posts.length; ++i) {
            postViews.push(<Post key={i} title={posts[i]["title"]} content={posts[i]["content"]} />)
        }
        return (
            <div>
                <div>"HI"</div>
                <Post title={"T"} content={"C"} />
                {postViews}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Posts;
