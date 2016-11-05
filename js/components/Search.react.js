var React = require('react');
var PostActions = require('../actions/PostActions');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var Posts = require('../constants/Posts');
var options = getTitles(Posts);

function getTitles(posts) {
    var titles = [];
    for (var i = 0; i < posts.length; ++i) {
        titles.push(posts[i]["action"] + " ... " + posts[i]["subject"]);
    }
    return titles;
}

var Search = React.createClass({

    _getPosts: function(e) {
        if (e.keyCode === 13) {
            var param = document.getElementById("search").value;
            console.log(param);
            PostActions.getPosts(param);
        }
    },

    render: function() {
        var optionViews = [];
        for (var i = 0; i < options.length; ++i) {
            optionViews.push(<option key={i} value={options[i]} />);
        }

                  //<option value="Travel ... Sydney, Australia"/>
                  //<option value="Live ... 555 Haight St, San Francisco, CA"/>
                  //<option value="Learn ... Algorithms"/>
        return (
            <div className="search">
                <Row>
                    <div className="title">Giddit</div>
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
    }
});

module.exports = Search;
