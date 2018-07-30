import React from 'react';
import {AutoForm, AutoField, ErrorsField} from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';

export default class Login extends React.Component {
    constructor() {
        super();
        this.redirectLogout.bind(this);
        this.redirectLogin.bind(this);
        this.redirectList.bind(this);
    }

    handleLogin = (data) => {
        const {email, password} = data;
        Meteor.loginWithPassword(email, password, (err) => {
            if (!err) {
                return this.props.history.push('/posts/reactive');
            }
            alert(err.reason);
        });
    };

    redirectLogout = () => {
        if(this.props.history)
            Meteor.logout(() => this.props.history.push('/login'));
    }

    redirectLogin = () => {
        if(this.props.history)
            this.props.history.push('/login');
    }

    redirectList = () => {
        if(this.props.history)
            this.props.history.push('/posts/reactive');
    }

    redirectRegister = () => {
        if(this.props.history)
            this.props.history.push('/register');
    }

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

                    <button onClick={this.redirectRegister}>Register</button>
                </div>
            );
        }
        else
            return (<div>
                <button onClick={this.redirectLogout}>Logout</button>
                <button onClick={this.redirectList}>posts</button>
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