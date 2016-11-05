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
        if (PostStore.getAllPosts().length === 0) {
            PostActions.getS3Posts();
        }
    },

    componentWillUnmount: function() {
        PostStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var posts = this.state.posts;
        var postViews = [];
        for (var i = 0; i < posts.length; ++i) {
            postViews.push(<Post key={i}
                action={posts[i]["action"]}
                subject={posts[i]["subject"]}
                tags={posts[i]["tags"]}
                content={posts[i]["content"]}
                upvotes={posts[i]["upvotes"]}
                downvotes={posts[i]["downvotes"]}
                id={posts[i]["id"]} />)
        }
        return (
            <div className="postContainer">
                <div className="placeHolder"></div>
                {postViews}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Posts;
