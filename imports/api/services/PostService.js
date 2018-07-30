import { Posts } from '/db';
import { createQuery } from 'meteor/cultofcoders:grapher';
class PostService {
    static create(userId, post) { 
        post.userId = userId;
        const postId = Posts.insert(post);
        return postId;
    }
    
    static getSinglePost(postId) {

    	if (!postId) {
            throw new Meteor.Error('not-found');
        }

        const query = Posts.createQuery({
        	$filter({filters,options,params})
        	{
        		if(params._id)
        			filters._id = params._id;
        	},
        	title : 1,
        	createdAt: 1,
            description: 1,
            type : 1,
            userId : 1,
            views : 1,
           
            comments : {
            	comment: 1,
                createdAt: 1,
                userId : 1,
                postId : 1,
                authorEmail: 1,
                userId: 1,
                $options : {sort : {createdAt : -1}},

                user : {
                	emails: 1
                }
            }
        });
        query.clone();
        query.setParams({
        	_id : postId
        });
        return query.fetchOne();
    }

    static getPostList(){
    	const query = Posts.createQuery({

    		$option : {sort : {createdAt : -1}},
    		title :1 ,
    		createdAt: 1,
    		description: 1,
    		type: 1,
    		userId: 1,
    		views: 1,
    		author : {
    			emails: 1
    		}


    	});
    	return query.clone().fetch();
    }

    static updateViewCount(postId){
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

    static updatePost(_id,postData,userId)
    {
    	Posts.update({_id: _id, userId: userId}, {
            $set: {
                title: postData.title,
                description: postData.description
            }
        });
    }

    static removePost(_id,userId)
    {
    	Posts.remove({_id: _id, userId: userId});
    }
}
export default PostService;