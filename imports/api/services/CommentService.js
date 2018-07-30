import { Comments } from '/db';
import { createQuery } from 'meteor/cultofcoders:grapher';
class CommentService{

	static create(post,comment,userId){
		var commentData = {};
		commentData.comment = comment.comment;
        commentData.userId = userId;
        commentData.postId = post._id;
        commentData.authorEmail = Meteor.user().emails[0].address;
        
        Comments.insert(commentData);
	}

	static remove(comment)
	{
		Comments.remove(comment._id);
	}
}

export default CommentService;