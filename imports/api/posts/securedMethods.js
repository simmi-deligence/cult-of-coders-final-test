import {Meteor} from 'meteor/meteor'
import {Posts,Comments} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
    'secured.post_create'(post) {
        Security.checkLoggedIn(this.userId);
        post.userId = this.userId;
       
        Posts.insert(post);
    },

    'secured.post_list' () {
        return Posts.find().fetch();
    },

    'secured.post_edit' (_id, postData) {
        Posts.update({_id: _id, userId: this.userId}, {
            $set: {
                title: postData.title,
                description: postData.description
            }
        });
    },

    'secured.post_remove' (_id){
        Security.checkLoggedIn(this.userId);
        Posts.remove({_id: _id, userId: this.userId});
        //CASCADE DELETE TO ALL COMMENTS
        Comments.remove({postId : _id});
    },

    'secured.post_get' (_id) {
        return Posts.findOne(_id);
    },

    'secured.post_update' (_id) {
        var post = Posts.findOne(_id); 
         var views = parseInt(post.views) + 1;
         Posts.update(post._id, {
            $set: {
               views :  parseInt(post.views) + 1
            }
        });
    }


});