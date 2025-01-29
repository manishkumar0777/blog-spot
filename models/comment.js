const {Schema, model} = require('mongoose');

const commentSchmea = new Schema({
    commentBody : {
        type : String,
        required : true,
    },

    blogId : {
        type : Schema.Types.ObjectId,
        ref : 'blog'
    },

    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }

}, {timestamps : true});

const Comment = model('comment', commentSchmea);

module.exports = Comment