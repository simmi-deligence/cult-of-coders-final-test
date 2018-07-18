import React from 'react';
import {AutoForm, AutoField, LongTextField ,SelectField ,ErrorsField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import { Route, Redirect } from 'react-router';
export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    handleSubmit = (post) => {
    console.log(post);
        Meteor.call('post.create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
        
        });

        //Redirect to the listing
        this.props.history.push('/posts'); 
    };

    render() {
        const {history} = this.props;
       //Options array for the type 
        const optionsArray = [
                                { label: "Select Type", value :"" },
                                { label: "Nature", value: "Nature" }, 
                                { label: "Psychology", value: "Psychology" },
                                { label: 'Music', value:'Music'},
                                { label: 'Programming' , value : 'Programming'},
                                { label: 'Project Management', value : 'Project Management'},
                                { label: 'Other', value : 'Other'}
                            ];

        return (
            <div className="post">
                <AutoForm  onSubmit={this.handleSubmit.bind(this)} schema={PostSchema}>
                 <ErrorsField/>
                <SelectField name="type" options={optionsArray} />
                    <AutoField name="title"/>
                    <LongTextField name="description"/>

                    <button type='submit'>Add posts</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
