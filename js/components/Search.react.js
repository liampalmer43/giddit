var React = require('react');
var PostActions = require('../actions/PostActions');
var PostStore = require('../stores/PostStore');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

function getTitles(posts) {
    var titles = [];
    for (var i = 0; i < posts.length; ++i) {
        titles.push(posts[i]["action"] + " ... " + posts[i]["subject"]);
    }
    return titles;
}

function getState() {
    return {
        posts: PostStore.getAllPosts()
    };
}

var Search = React.createClass({

    _getPosts: function(e) {
        if (e.keyCode === 13) {
            var param = document.getElementById("search").value;
            PostActions.getPosts(param);
        }
    },

    _gotoCreate: function() {
        PostActions.setStage("create");
    },

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
        var options = getTitles(this.state.posts);
        var optionViews = [];
        for (var i = 0; i < options.length; ++i) {
            optionViews.push(<option key={i} value={options[i]} />);
        }

        return (
            <div className="search">
                <div className="heading">
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={6} className="title">Giddit</Col>
                        <Col xs={6} sm={6} md={6} lg={6} className="userName">
                            <Button onClick={this._gotoCreate} className="createButton">Create Post +</Button>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col xs={6} xsOffset={3} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3} className="searchContainer">
                        <datalist id="posts">
                            {optionViews}}
                        </datalist>
                        <input id="search" type="text" list="posts" placeholder="Search" className="searchInput" onKeyDown={this._getPosts}></input>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6}> </Col>
                </Row>
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Search;
