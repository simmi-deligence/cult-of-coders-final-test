import React from 'react';
import Security from '/imports/api/security';
import { Route, Redirect } from 'react-router';
import  EditPost  from './EditPost';
import DeletePost from './DeletePost';
import UpdatePostViews  from './UpdatePostViews';


export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
        this.updateViews.bind(this);
        this.redirectCreate.bind(this);
        this.setStateChange.bind(this);
        this.redirectLogout.bind(this);
        this.removePostAndComments = this.removePostAndComments.bind(this);
    }

    componentDidMount() {
        Meteor.call('secured.post_list', (err, posts) => {
            this.setState({posts});
        });
    }

    updateViews = (post)=>{
        if(this.props.history)
            this.props.history.push('/posts/view/' + post._id);
    }

    removePostAndComments(id){
        if (window.confirm('Are you sure you wish to delete this post?'))
        {
            Meteor.call('secured.post_remove',id,(err)=> {
                if(err)
                    return alert(err.reason);
                else
                {
                    this.setStateChange();
                }
            });
        }
    }

    setStateChange = () => {
       
        Meteor.call('secured.post_list', (err, posts) => {
            this.setState({posts});
        });
    }

    redirectCreate = () => {
        if(this.props.history)
            this.props.history.push('/posts/create');
    }

    redirectEdit = (id) => {
       
        if(id)
        {
            if(this.props.history)
                this.props.history.push('/posts/edit/'+id);
        }
    }

    redirectLogout = () => {
        if(this.props.history)
            Meteor.logout(() => this.props.history.push('/login'));
    }

    render() {
        const  {posts } = this.state;
        const { history } = this.props;

        var datestr = 'No date';
        if (!posts) {
            return <div>Loading....</div>
        }


        return (
            <div className="post">
                {
                    posts.map((post,i) => {
                        return (
                            <div key={post._id}>
                           
                                <p>Post id: {post._id} </p>
                                <p>Type : { post.type}</p>
                                <p>Post title: {post.title}</p>
                                <p> Post Description: {post.description} </p>
                                <UpdatePostViews
                                    key={post._id+1}
                                    post = {post}
                                    onClickPostUpdateViews={this.updateViews }

                                />
                                
                                {Meteor.user() && Meteor.user()._id==post.userId ?
                                    (<div> <EditPost
                                        key={post._id}
                                        id = {post._id}
                                        onClickEditPost={this.redirectEdit}

                                    />
                                    <DeletePost
                                        key={i}
                                        id = {post._id}
                                        onClickRemovePostAndComments={this.removePostAndComments}

                                    /> </div>)

                                    : ''
                                }
                                
                            </div>
                        )
                    })}
                {Meteor.user() ? (<div><button onClick={ this.redirectCreate }>Create a new post</button><button onClick={ this.redirectLogout }>Logout</button></div>)
                    : ''}
            </div>
        )
    }
}
