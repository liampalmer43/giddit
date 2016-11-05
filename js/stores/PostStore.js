var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var PostConstants = require('../constants/PostConstants');
var assign = require('object-assign');

var Posts = require('../constants/Posts');

var CHANGE_EVENT = 'change';

var state = Posts;

//[{title: "t1", content: "c1aaa"},
//             {title: "t2", content: "c2aaaa"}];

function getPosts() {
    return 0;
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


var PostStore = assign({}, EventEmitter.prototype, {

    getState: function() {
        return state;
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
            getPosts();
            break;
        case PostConstants.UPVOTE:
            upvote(action.id);
            break;
        case PostConstants.DOWNVOTE:
            downvote(action.id);
            break;
        default:
    }
});

module.exports = PostStore;
