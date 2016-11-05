var React = require('react');
var PostActions = require('../actions/PostActions');

var Button = require('react-bootstrap/lib/Button');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Form = require('react-bootstrap/lib/Form');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Input = require('react-bootstrap/lib/Input');

var Create = React.createClass({

    _createPost: function() {
        var action = document.getElementById("action").value;
        var subject = document.getElementById("subject").value;
        var content = document.getElementById("details").value;
        console.log(action);
        console.log(subject);
        console.log(content);
        PostActions.createPost({action: action,
                                subject: subject,
                                content: content});
    },

    render: function() {
        //var optionViews = [];
        //for (var i = 0; i < options.length; ++i) {
        //    optionViews.push(<option key={i} value={options[i]} />);
       // }

        return (
            <div className="create">
                <p className="createTitle">Giddit - Share Your Knowledge</p>
                <hr></hr>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>Action</Col>
                        <Col xs={9} sm={9} md={9} lg={9}>
                            <FormControl id="action" type="text" placeholder="ie Play or Travel" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>Subject</Col>
                        <Col xs={9} sm={9} md={9} lg={9}>
                            <FormControl id="subject" type="text" placeholder="ie Basketball or New York" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                        <Col componentClass={ControlLabel} xs={2} sm={2} md={2} lg={2}>Details</Col>
                        <Col xs={9} sm={9} md={9} lg={9}>
                            <FormControl id="details" componentClass="textarea" placeholder="..." rows="10" />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this._createPost}>Create</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
});

module.exports = Create;
