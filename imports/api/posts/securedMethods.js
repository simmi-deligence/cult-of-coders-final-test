import {Meteor} from 'meteor/meteor'
import {Posts,Comments} from '/db';
import Security from '/imports/api/security';
import { createQuery } from 'meteor/cultofcoders:grapher';
import { PostService } from '/imports/api';


Meteor.methods({
    'secured.post_create'(post) {
        if (!this.userId) {
            throw new Meteor.Error('not-allowed');
        }

        Security.checkLoggedIn(this.userId);
        PostService.create(this.userId,post);
    },

    'secured.post_list' () {
        return PostService.getPostList();
    },

    'secured.post_edit' (_id, postData) {
        if (!this.userId) {
            throw new Meteor.Error('not-allowed');
        }

        Security.checkLoggedIn(this.userId);
        PostService.updatePost(_id, postData,this.userId);
    },

    'secured.post_remove' (_id){
        Security.checkLoggedIn(this.userId);
        PostService.removePost(_id,this.userId);
    },

    'secured.post_get' (postId) {
        return PostService.getSinglePost(postId);
    },

    'secured.post_update' (postId) {
       PostService.updateViewCount(postId);
    }
    /*Grapher queries */

});