import { Meteor } from 'meteor/meteor';
import { Comments } from '/db';
import Security from '/imports/api/security';
import { CommentService } from '/imports/api';

Meteor.methods({
	

	'secured.post_comments_create'(post,comment){
		Security.checkLoggedIn(this.userId);
		CommentService.create(post,comment,this.userId);	
	},

	'secured.remove_comment'(comment){
		Security.checkLoggedIn(this.userId);
		
		CommentService.remove(comment)
	},

});