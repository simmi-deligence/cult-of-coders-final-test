import React from 'react';
import {AutoForm, AutoField, LongTextField ,SelectField ,ErrorsField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { Route, Redirect } from 'react-router';
import { PostTagsLabels } from '/db/posts/enum/tags';
export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.handleSubmit.bind(this);
        this.redirectList.bind(this);
    }

    handleSubmit = (post) => {
        Meteor.call('secured.post_create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
        
        });

        //Redirect to the listing
        this.props.history.push('/posts/reactive');
    };

    redirectList = () => {
        if(this.props.history)
            this.props.history.push('/posts/reactive');
    }

    render() {
        const {history} = this.props;
        //Options array for the type

        return (
            <div className="post">
                <AutoForm  onSubmit={this.handleSubmit} schema={PostSchema}>
                    <ErrorsField/>
                    <SelectField name="type" options={PostTagsLabels} />
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <button type='submit'>Add posts</button>
                    <button onClick={this.redirectList}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
