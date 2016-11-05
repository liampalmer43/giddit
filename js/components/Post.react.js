var React = require('react');

var PostActions = require('../actions/PostActions');

var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Image = require('react-bootstrap/lib/Image');
var Panel = require('react-bootstrap/lib/Panel');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Badge = require('react-bootstrap/lib/Badge');

var Post = React.createClass({

    _upvote: function(id) {
        PostActions.upvote(id);
    },

    _downvote: function(id) {
        console.log(id);
        PostActions.downvote(id);
    },

    render: function() {
        var action = this.props.action;
        var subject = this.props.subject;
        var tags = this.props.tags;
        var content = this.props.content;
        var upvotes = this.props.upvotes;
        var downvotes = this.props.downvotes;
        var id = this.props.id;

        var tagViews = [];
        for (var i = 0; i < tags.length; ++i) {
            tagViews.push(<Badge key={i} className="tag" pullRight={true}>{tags[i]}</Badge>)
        }

        //<Panel header={action + " ... " + subject} bsStyle="info" className="postHeader">
        return (
            <div className="post">
                <p className="postHeader">{action + " ... " + subject}</p>
                <div className="postBody">
                    <p className="postContent">{content}</p>
                    <hr></hr>
                    <Row>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            <ButtonToolbar>
                                <Button bsStyle="primary" className="postButton" onClick={this._upvote.bind(this, id)}>
                                    <Glyphicon glyph="arrow-up"/> | {upvotes}
                                </Button>
                                <Button bsStyle="primary" className="postButton" onClick={this._downvote.bind(this, id)}>
                                    <Glyphicon glyph="arrow-down"/> | {downvotes}
                                </Button>
                            </ButtonToolbar>
                        </Col>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            {tagViews}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

});

module.exports = Post;
