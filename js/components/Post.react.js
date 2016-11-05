var React = require('react');

var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Image = require('react-bootstrap/lib/Image');
var Panel = require('react-bootstrap/lib/Panel');

var Post = React.createClass({

  render: function() {
    var title = this.props.title;
    var content = this.props.content;

    return (
        <div className="post">
            <Panel header={title} bsStyle="info">
                <p>{content}</p>
            </Panel>
        </div>
    );
  }

});

module.exports = Post;
