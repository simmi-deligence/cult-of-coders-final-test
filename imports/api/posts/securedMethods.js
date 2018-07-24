import {Meteor} from 'meteor/meteor'
import {Posts,Comments} from '/db';
import Security from '/imports/api/security';
import { createQuery } from 'meteor/cultofcoders:grapher';
import { Match } from 'meteor/check';


Meteor.methods({
    'secured.post_create'(post) {
        Security.checkLoggedIn(this.userId);
        post.userId = this.userId;      
        Posts.insert(post);
    },

    'secured.post_list' () {
        //return Posts.find().fetch();
        const query = Posts.createQuery({
            title : 1,
            createdAt: 1,
            description: 1,
            type : 1,
            userId : 1,
            $options: {sort: {createdAt: -1}},
           
        });
      
        return query.clone().fetch();
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
    },

    'secured.post_get' (postId) {

        const query = Posts.createQuery({
            $filter({filters,options,params}){
                if(params._id)
                    filters._id=params._id
            },
            title : 1,
            createdAt: 1,
            description: 1,
            type : 1,
            userId : 1,
            views : 1,
            $options: {sort: {createdAt: -1}},
           
            comments: {
                comment: 1,
                createdAt: 1,
                userId : 1,
                postId : 1,
                authorEmail: 1,
                userId: 1
            }

        });
        query.clone();
        query.setParams({
            _id:postId,
        });
        return query.fetchOne();
    },

    'secured.post_update' (postId) {
        var post = Posts.createQuery({ 
            views : 1, 
            $filters:{_id:postId},   
        }).clone().fetchOne()

        var views = parseInt(post.views) + 1;
        Posts.update(post._id, {
            $set: {
               views :  parseInt(post.views) + 1
            }
        });
    }
    /*Grapher queries */

});