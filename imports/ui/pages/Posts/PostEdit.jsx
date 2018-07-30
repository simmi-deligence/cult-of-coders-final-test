import React from 'react';
import {AutoForm, AutoField, LongTextField,SelectField,ErrorsField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { PostTagsLabels } from '/db/posts/enum/tags';

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
        this.handleSubmit.bind(this);
        this.redirectList.bind(this);
    }

    componentDidMount() {
        Meteor.call('secured.post_get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    handleSubmit = (post) => {
        Meteor.call('secured.post_edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
        //alert('Post modified!')
        });
        this.props.history.push('/posts/reactive');
    };

    redirectList = () => {
        if(this.props.history)
            this.props.history.push('/posts/reactive');
    }

    render() {
        const {history} = this.props;
        const {post} = this.state;
         
        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.handleSubmit} schema={PostSchema} model={post}>
                    <ErrorsField/>
                    <SelectField name="type" options={PostTagsLabels} />
                    <AutoField name="title"/>
                    <LongTextField name="description"/>

                    <button type='submit'>Edit post</button>
                    <button onClick={this.redirectList}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
