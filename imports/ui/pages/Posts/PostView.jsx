import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';

class PostView extends React.Component {
    render() {
        const { post } = this.props;
        
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
                    <p>Post id: {post._id} </p>
                    <p>Type : { post.type}</p>
                    <p>Post title: {post.title}, Post Description: {post.description} </p>
                    <p>Date : {datestr } </p> 
                    <p>User Views : {post.views } </p>  
                     <button onClick={() => {
                        this.props.history.push("/posts")
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

    return {
        loading: !handle.ready(),
        post: Posts.findOne({_id:props.match.params._id}),
        ...props    
    };
})(PostView);