var React = require('react');

var Search = require('./Search.react');
var Title = require('./Title.react');
var Posts = require('./Posts.react');
var Create = require('./Create.react');

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
