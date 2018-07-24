import React from 'react';
import Security from '/imports/api/security';
import { Route, Redirect } from 'react-router';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
        this.updateViews.bind(this);
    }

    componentDidMount() {
        Meteor.call('secured.post_list', (err, posts) => {
            this.setState({posts});
        });
    }

    updateViews(post){
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

            }
        );

    
    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;

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

                             <button  onClick={()=>{this.updateViews(post)}}>View Details
                            </button>
                            {Meteor.user() && Meteor.user()._id==post.userId ? 
                                (<div><button onClick={() => { history.push("/posts/edit/" + post._id)  }}> Edit post </button>

                                <button onClick={()=>{ if (window.confirm('Are you sure you wish to delete this post?')) this.removePostAndComments(post._id)}}>Remove Post</button></div>

                                ) : ''}
                                
                            </div>
                        )
                    })}
                {Meteor.user() ? (<div><button onClick={() => history.push('/posts/create')}>Create a new post</button><button onClick={() => Meteor.logout(() => this.props.history.push('/login'))}>Logout</button></div>)
                 : ''}
            </div>
        )
    }
}
