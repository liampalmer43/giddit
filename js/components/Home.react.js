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

var Nav = require('react-bootstrap/lib/Nav');
var Navbar = require('react-bootstrap/lib/Navbar');
var NavItem = require('react-bootstrap/lib/NavItem');
var Image = require('react-bootstrap/lib/Image');

var Home = React.createClass({

    _home: function() {
        console.log("HOME");
    },

    _prototype: function() {
        PostActions.setStage("find");
    },

    render: function() {
        return (
            <div className="home">
                <Navbar id="homeNavbar">
                    <Nav className="homeNav">
                        <NavItem eventKey={1}><Button onClick={this._prototype}>Prototype</Button> <Glyphicon glyph="arrow-left"></Glyphicon> CLICK HERE</NavItem>
                    </Nav>
                </Navbar>
                <div className="homePlaceHolder" />
                <img className="banner" src="photos/penguin.png" />
                <div className="slogan">Giddit.io - Take the plunge with confidence.</div>
                <div className="details">A searching and sharing site for extremely useful details.  For anything and anyone.</div>
                <Row className="functionality">
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Panel header="SEARCH" bsStyle="info">
                            <p>Search for essential information on rental properties, travel destinations, extreme sports, and anything else.</p>
                            <img className="appImage" src="photos/search.png" />
                        </Panel>
                    </Col>  
                    <Col xs={6} sm={6} md={6} lg={6}>
                        <Panel header="POST" bsStyle="info">
                            <p>When you find yourself thinking, "I wish I knew that before", help somebody else out with your advice.</p>
                            <img className="appImage" src="photos/post.png" />
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }

});

module.exports = Home;
