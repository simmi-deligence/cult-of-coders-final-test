import React from 'react';
import {AutoForm, AutoField, LongTextField,SelectField,ErrorsField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    handleSubmit = (post) => {
        Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
        this.props.history.push('/posts');
    };

    render() {
        const {history} = this.props;
        const {post} = this.state;
         const optionsArray = [
                                { label: "Select Type", value :"" },
                                { label: "Nature", value: "Nature" }, 
                                { label: "Psychology", value: "Psychology" },
                                { label: 'Music', value:'Music'},
                                { label: 'Programming' , value : 'Programming'},
                                { label: 'Project Management', value : 'Project Management'},
                                { label: 'Other', value : 'Other'}
                            ];

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.handleSubmit.bind(this)} schema={PostSchema} model={post}>
                 <ErrorsField/>
                 <SelectField name="type" options={optionsArray} />
                    <AutoField name="title"/>
                    <LongTextField name="description"/>

                    <button type='submit'>Edit post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
