var AppDispatcher = require('../dispatcher/AppDispatcher');
var PostConstants = require('../constants/PostConstants');

var PostActions = {
    getPosts: function(param) {
        AppDispatcher.dispatch({
            actionType: PostConstants.GET_POSTS,
            param: param
        });
    },
    getS3Posts: function() {
        AppDispatcher.dispatch({
            actionType: PostConstants.GET_S3_POSTS
        });
    },
    createPost: function(params) {
        AppDispatcher.dispatch({
            actionType: PostConstants.CREATE_POST,
            params: params
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
    },
    gotoCreate: function() {
        AppDispatcher.dispatch({
            actionType: PostConstants.GOTO_CREATE
        });
    }
};

module.exports = PostActions;
