import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';

class PostListReactive extends React.Component {
    constructor() {
        super();
    }
    updateViews(post){
        //var post = this.props;
        console.log(post)
         Meteor.call('post.update', this.props.match.params._id,post, (err) => {
             if (err) {
                return alert(err.reason);
            }
            else
            {
                this.props.history.push("/posts/view/" + post._id);
            }
        });

    }
    render() {
        const {posts, history} = this.props;
        var datestr = 'No date';
        if (!posts) {
            return <div>Loading....</div>
        }


        return (
            <div className="post">
                {
                    posts.map((post) => {

                    if(post.createdAt) 
                    {  
                        date = new Date(post.createdAt);
                        datestr = date.toDateString();
                    }

                        return (
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <p>Type : { post.type}</p>
                                
                                <p>Post title: {post.title}, Post Description: {post.description} </p>
                                <p>Date : {datestr } </p>
                                <button  onClick={()=>{this.updateViews(post)}}>View Details
                            </button>
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}


export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    console.log({
        ...props
    });

    return {
        loading: !handle.ready(),
        posts: Posts.find({},{sort :{createdAt : -1}}).fetch(),
        ...props
    };
})(PostListReactive);