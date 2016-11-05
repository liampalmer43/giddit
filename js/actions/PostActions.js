var AppDispatcher = require('../dispatcher/AppDispatcher');
var PostConstants = require('../constants/PostConstants');

var PostActions = {
    getPosts: function() {
        AppDispatcher.dispatch({
            actionType: PostConstants.GET_POSTS
        });
    },
    upvote: function(id) {
        AppDispatcher.dispatch({
            actionType: PostConstants.UPVOTE,
            id: id
        });
    },
    downvote: function(id) {
        AppDispatcher.dispatch({
            actionType: PostConstants.DOWNVOTE,
            id: id
        });
    }
};

module.exports = PostActions;
