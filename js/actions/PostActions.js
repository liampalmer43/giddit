var AppDispatcher = require('../dispatcher/AppDispatcher');
var PostConstants = require('../constants/PostConstants');

var PostActions = {
    getPosts: function(param) {
        AppDispatcher.dispatch({
            actionType: PostConstants.GET_POSTS,
            param: param
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
