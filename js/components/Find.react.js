var React = require('react');

var Search = require('./Search.react');
var Posts = require('./Posts.react');

var Find = React.createClass({

    render: function() {
        return (
            <div className="find">
                <Search />
                <Posts />
            </div>
        );
    }
});

module.exports = Find;
