import React from 'react';
import {AutoForm, AutoField, LongTextField ,SelectField ,ErrorsField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import { Route, Redirect } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Comments } from '/db';
import ReactDom from 'react-dom';
class CommentCreate extends React.Component {
    constructor() {
        super();
        this.state = { comments: null };       
    }

    handleSubmit = (comment) => {   

    ReactDom.findDOMNode(this.refs.comment).value=''; 
        Meteor.call('secured.post_comments_create',this.props.post, comment, (err) => {
            if (err) {
                return alert(err.reason);
            }
            else
            {             
                Meteor.call('secured.post_comments_get',comment,(err,comments)=>{
                    this.setState({comments});
                })
            }      
        });   
    };


    removeComment(comment){
        Meteor.call('secured.remove_comment', comment,(err)=>{
            if(err)
                alert(err.reason);
            else
            {
                Meteor.call('secured.post_comments_get',comment,(err,comments)=>{
                    this.setState({comments});
                })
            }  
        });
    }
    changeDate(dateChange){
            if(dateChange) 
            {  
                date = new Date(dateChange);
                return date.toDateString();
            }
    }

    render() 
    {
            const { commentData }  = this.props;      
            if(this.state.comments)
            this.props.commentData = this.state.comments;
            const {history} = this.props;   

            return (
                <div className="postComment">
                    {
                        commentData.map((comment) => {
                        return (
                            <div key={comment._id}>
                           
                                <p>Comment id:      { comment._id } </p>
                                <p>Comment :        { comment.comment}</p>
                                <p>Author Email:    { comment.authorEmail}</p>
                                <p>Comment Date :   { this.changeDate(comment.createdAt) }</p>
                                {
                                    Meteor.user() && (Meteor.user()._id==comment.userId || Meteor.user()._id==this.props.post.userId)? (<button onClick={() => {
                                   if (window.confirm('Are you sure you wish to delete this post?'))  this.removeComment(comment);
                                }}>Remove Comment
                                </button>) : ''}
                                <hr/>
                                
                            </div>
                        )
                    })}

                    { 
                        Meteor.user() ? 
                        <AutoForm  onSubmit={this.handleSubmit.bind(this)} schema={CommentSchema}>
                         <ErrorsField/>
                            <LongTextField name="comment" ref="comment"/>
                            <button type='submit'>Add Comment</button>      
                        </AutoForm>  : '' 
                    }
                   
                </div>
            )
    }
}


export default withTracker(props => {
    const handle = Meteor.subscribe('comments');
  
    return {
        loading : !handle.ready(),
        commentData : Comments.find({ postId:props.match.params._id }, { sort : { createdAt : -1} }).fetch(),
        ...props
    }
})(CommentCreate);