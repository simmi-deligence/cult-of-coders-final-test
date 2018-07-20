import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        post.createdAt = new Date();

        Posts.insert(post);
    },

    'post.list' () {
        return Posts.find({},{sort :{createdAt : -1}}).fetch();
    },

    'post.edit' (_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type
            }
        });
    },

    'post.remove' (_id){
        Posts.remove(_id);
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    },


    'post.update' (_id,post) {
          console.log(post._id)
         var views = parseInt(post.views) + 1;
         console.log(views)
         Posts.update(post._id, {
            $set: {
               views :  parseInt(post.views) + 1
            }
        });
    }
});