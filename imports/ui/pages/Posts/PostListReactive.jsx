import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';

class PostListReactive extends React.Component {
   constructor() {
        super();
        this.state = {posts: null};
        this.updateViews.bind(this);
    }


    updateViews(post){
        // Update user views      
        this.props.history.push("/posts/view/" + post._id);         
    }


    removePostAndComments = (postId) => {
        Meteor.call('secured.post_remove',postId,(err)=> {
            if(err)
                return alert(err.reason);  
            else
            {
                Meteor.call('secured.post_list', (err, posts) => {
                    this.setState({posts});
                });
            }
        });  
    }
    render() {
        const { history,posts} = this.props;
        
        const postsD = {};
        if(this.state.posts)
        this.props.posts = this.state.posts

        var datestr = 'No date';
        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                           
                                <p>Post id: {post._id} </p>
                                <p>Type : { post.type}</p>
                                <p>Post title: {post.title}</p>
                                <p> Post Description: {post.description} </p>

                                <button  onClick={()=>{this.updateViews(post)}}>View Details </button>
                              {Meteor.user() && Meteor.user()._id==post.userId ? 
                                (<div><button onClick={() => { history.push("/posts/edit/" + post._id)  }}> Edit post </button>

                                <button onClick={()=>{ if (window.confirm('Are you sure you wish to delete this post?')) this.removePostAndComments(post._id)} }>Remove Post</button></div>
                                ) : ''}
                                
                            </div>
                        )
                    })}
                    

                    {
                        Meteor.user() ? (<div><button onClick={() => history.push('/posts/create')}>Create a new post</button><button onClick={() => Meteor.logout(() => this.props.history.push('/login'))
                    }>Logout</button></div>) : <button onClick={() => {this.props.history.push('/login') }
                    }>Login</button>}

            </div>
        )
    }
}


export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    return {
        loading: !handle.ready(),
        posts: Posts.find({},{sort :{createdAt : -1}}).fetch(),
        ...props
    };
})(PostListReactive);