import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts, Comments } from '/db';
import CommentCreate from './PostComment';


class PostView extends React.Component {
    
    componentDidMount() {
         Meteor.call('secured.post_update', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
            
        });
    }



    render() {
        const { post,commentCount } = this.props;
        
        if(post)
        { 
            datestr = 0;
            if(post.createdAt) 
            {  
                date = new Date(post.createdAt);
                datestr = date.toDateString();
            }
             return (
             <div className="post">
              {           
                    <div key={post._id}>

                    <header>
                        {
                        Meteor.user() ? (<button onClick={() => Meteor.logout(() => this.props.history.push('/login'))
                    }>Logout</button>) : <button onClick={() => {this.props.history.push('/login') }
                    }>Login</button>}
                        <h4>Post Details </h4>
                    </header>

                    <p>Post id: {post._id} </p>
                    <p>Type : { post.type}</p>
                    <p>Post title: {post.title}, Post Description: {post.description} </p>
                    <p>Date : {datestr } </p> 
                    <p>User Views : {post.views } </p>
                    <p> Total Comments: {commentCount}</p>
                    <hr/> 
                    {/*Comment box here*/}

                    { Meteor.user() ?  <CommentCreate {...this.props} /> : ''}
                    
                    {/*Comment end here*/}
                     <button onClick={() => {
                        this.props.history.push("/posts/reactive")
                    }}>Back to listing </button> 
                     </div>
                    
                }
                 </div>
            );
        }
        else
        { return <div>Loading....</div> }
       
    }
}


export default withTracker(props => {
    const handle = Meteor.subscribe('posts');
    Meteor.subscribe('comments');

    return {
        loading: !handle.ready(),
        post: Posts.findOne({_id:props.match.params._id}),
        commentCount : Comments.find({postId:props.match.params._id}).count(),
        ...props    
    };
})(PostView);