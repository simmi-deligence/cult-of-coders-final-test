import React from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';

export default class Login extends React.Component {
    constructor() {
        super();
    }

    handleLogin = (data) => {
        const {email, password} = data;
        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                return this.props.history.push('/posts');
            }
            alert(err.reason);
        });
    };

    render() {
//if(Meteor.loggingIn())
      //  console.log(Meteor.loggingIn());

        if(!Meteor.loggingIn())
        {
            return (
                <div className="authentication">
                    <AutoForm onSubmit={this.handleLogin} schema={LoginSchema}>
                        <ErrorsField/>
                        <AutoField name="email" placeholder="Email"/>
                        <AutoField name="password" type="password" placeholder="Password"/>
                        <button type="submit">Login</button>

                    </AutoForm>

                    <button onClick={() => this.props.history.push('/register')}>Register</button>
                </div>
            );
        }
        else
            return (<div>
                    <button onClick={() => Meteor.logout(() => this.props.history.push('/login'))}>Logout</button>
                    <button onClick={() => this.props.history.push('/posts')}>posts</button>
                </div>);

    }
}

const LoginSchema = new SimpleSchema({
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {type: String}
});
