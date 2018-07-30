import React from 'react';
import {AutoForm, AutoField, LongTextField ,SelectField ,ErrorsField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import { Route, Redirect } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Comments } from '/db';
import ReactDom from 'react-dom';

class DeleteResult extends React.Component {
   
    constructor() {
        super()
        this.removeComment.bind(this);
    }

    removeComment = () => {
        if (window.confirm('Are you sure you wish to delete this post?'))
            Meteor.call('secured.remove_comment', this.props.comment,(err)=>{
                if(err)
                    alert(err.reason);
           
            });
    }

    render()
    {
        return (
            <div>
                {
                    (<button onClick={ this.removeComment } type="button">Delete Comment</button>)
                }
            
            </div>
        );
    }
}

export default class CommentCreate extends React.Component {

    constructor(props) {
        super(props);
        //set state from parent
        this.state = { comments: props.post.comments };
        this.formRef = React.createRef();
        this.handleSubmit.bind(this);
       
    }

    handleSubmit = (comment) => {
       
        Meteor.call('secured.post_comments_create',this.props.post, comment, (err) => {
            if (err) {
                return alert(err.reason);
            }
            this.formRef.current.reset();
 
        });
       
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ comments: nextProps.post.comments });
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
        const commentData = this.state.comments;
        
        if(commentData)
        {
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
                                        Meteor.user() && (Meteor.user()._id==comment.userId || Meteor.user()._id==this.props.post.userId)?
                                            <DeleteResult
                                                key={comment._id}
                                                comment = { comment }
                                            /> : ''
                                    }
                                    <hr/>
                                
                                </div>
                            )
                        })}

                    {
                        Meteor.user() ?
                            <AutoForm  onSubmit={this.handleSubmit}  ref={this.formRef}  schema={CommentSchema}>
                                <ErrorsField/>
                                <LongTextField name="comment"/>
                                <button type='submit'>Add Comment</button>
                            </AutoForm>  : ''
                    }
                   
                </div>
            )
        }
        else
            return (<div>{
                Meteor.user() ?
                    <AutoForm  onSubmit={this.handleSubmit}  ref={this.formRef}  schema={CommentSchema}>
                        <ErrorsField/>
                        <LongTextField name="comment" />
                        <button type='submit'>Add Comment</button>
                    </AutoForm>  : ''
            }</div>);
    }
}


