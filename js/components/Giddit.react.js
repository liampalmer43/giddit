var React = require('react');
var PostActions = require('../actions/PostActions');
var PostStore = require('../stores/PostStore');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var Find = require('./Find.react');
var Create = require('./Create.react');

function getState() {
    return {
        find: PostStore.find()
    };
}

var Giddit = React.createClass({

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
        content = <Create />;
        switch(this.state.find) {
            case true:
                content = <Find />;
                break;
            default:
        }

        return (
            <div className="giddit">
                {content}
            </div>
        );
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = Giddit;
