var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PostConstants = require('../constants/PostConstants');
var assign = require('object-assign');
var AWS = require('aws-sdk');

var CHANGE_EVENT = 'change';

//AWS.config.loadFromPath('./conf.json');
AWS.config.update({
      accessKeyId: "AKIAJQEZDVGM6UZJZRYA",
      secretAccessKey: "+1pjn3wbehIS+FoQXYq83PLiWBUG6esnAiGHZxaj",
      "region": "us-east-2"   //<- If you want send something to your bucket, you need take off this settings, because the S3 are global. 
});
var ep = new AWS.Endpoint('giddit.io.s3-website.us-east-2.amazonaws.com');
var s3 = new AWS.S3();

var Posts = []; //getS3Posts();//require('../constants/Posts');
var state = Posts;
var find = true;

function getS3Posts() {
    var params = {
        Bucket: 'giddit.io', /* required */
        RequestPayer: 'requester'
    };
    s3.listObjects(params, function(err, data) {
    if (err) {
        console.log(err, err.stack); // an error occurred
    } else {     
    console.log(data.Contents);
    var ct = data.Contents;
    for (var i = 0; i < ct.length; ++i) {
var ps = {
  Bucket: 'giddit.io', /* required */
  Key: ct[i]["Key"]
};
s3.getObject(ps, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {     
    console.log(data.Body.toString());
    console.log(JSON.parse(data.Body.toString()));
    Posts.push(JSON.parse(data.Body.toString()));
    PostStore.emitChange();
  }
});



  }}
});
/*
    s3.listBuckets(function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Bucket List", data.Buckets);
            console.log(data);
            // Posts = ...
            // state = ...
            PostStore.emitChange();
        }
    });
*/
}

function getPosts(param) {
console.log(param);
    if (param === "") {
        state = Posts;
        PostStore.emitChange();
        return;
    }

    var result = [];
    var parts = param.split(" ... ");
    if (parts.length === 2) {
        var action = parts[0];
        var subject = parts[1];
        for (var i = 0; i < Posts.length; ++i) {
            if (Posts[i]["action"] === action && Posts[i]["subject"] === subject) {
                result.push(Posts[i]);
            }
        }
        state = result;
    } else {
        state = [];
    }
    PostStore.emitChange();
}

function getRandomId() {
    var result = "";
    for (var i = 0; i < 20; ++i) {
        result += (Math.floor(Math.random() * 10)).toString();
    }
    return result;
}

function createPost(params) {
    var post = {action: params["action"],
                subject: params["subject"],
                tags: [],
                content: params["content"],
                upvotes: 0,
                downvotes: 0,
                id: getRandomId()};
    
    var params = {Bucket: 'giddit.io', Key: post["id"], Body: JSON.stringify(post)};
    s3.putObject(params, function(err, data) {
        if (err) {
            console.log("Error uploading data: ", err);
        } else {
            console.log("Success uploading data to S3");
        }
    });

    Posts.push(post);
    find = true;
    PostStore.emitChange();
}

function upvote(id) {
    for (var i = 0; i < state.length; ++i) {
        if (state[i]["id"] === id) {
            state[i]["upvotes"] = state[i]["upvotes"] + 1;
            break;
        }
    }
    PostStore.emitChange();
}

function downvote(id) {
    for (var i = 0; i < state.length; ++i) {
        if (state[i]["id"] === id) {
            state[i]["downvotes"] = state[i]["downvotes"] + 1;
            break;
        }
    }
    PostStore.emitChange();
}

function gotoCreate() {
    find = false;
    state = [];
    PostStore.emitChange();
}


var PostStore = assign({}, EventEmitter.prototype, {

    getState: function() {
        return state;
    },

    getAllPosts: function() {
        return Posts;
    },

    find: function() {
        return find;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case PostConstants.GET_POSTS:
            getPosts(action.param);
            break;
        case PostConstants.GET_S3_POSTS:
            getS3Posts();
            break;
        case PostConstants.CREATE_POST:
            createPost(action.params);
            break;
        case PostConstants.UPVOTE:
            upvote(action.id);
            break;
        case PostConstants.DOWNVOTE:
            downvote(action.id);
            break;
        case PostConstants.GOTO_CREATE:
            gotoCreate();
            break;
        default:
    }
});

module.exports = PostStore;
