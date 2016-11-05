var AppDispatcher = require('../dispatcher/AppDispatcher');
var PostConstants = require('../constants/PostConstants');

var PostActions = {
    getPosts: function() {
        AppDispatcher.dispatch({
            actionType: PostConstants.GET_POSTS
        });
    }
};

module.exports = PostActions;
