import { Meteor } from 'meteor/meteor';
import { Comments } from '/db';
import Security from '/imports/api/security';

Meteor.methods({
	'secured.post_comments_get'(comment){
	
		return Comments.find({ postId:comment.postId }, { sort : { createdAt : -1} }).fetch();
	},

	'secured.post_comments_create'(post,comment){
		Security.checkLoggedIn(this.userId);
		
		var commentData = {};
		commentData.comment = comment.comment;
        commentData.userId = this.userId;
        commentData.postId = post._id;
        commentData.authorEmail = Meteor.user().emails[0].address;
        
        Comments.insert(commentData);
	},

	'secured.remove_comment'(comment){
		Security.checkLoggedIn(this.userId);
		if(comment.userId == this.userId)
		Comments.remove(comment._id);

	},

});