import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';
import { createQuery } from 'meteor/cultofcoders:grapher';
import { ReactiveVar } from 'meteor/reactive-var';
import  EditPost  from './EditPost';
import DeletePost from './DeletePost';
import UpdatePostViews  from './UpdatePostViews';


class PostListReactive extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
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
               
            });
        }
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
        const { history,posts} = this.props;
        //console.log(posts)
        const postsD = {};
        if(this.state.posts)
            this.props.posts = this.state.posts;

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
                                <p>Auther : {post.author.emails[0].address}</p>
                                <p>Type : { post.type}</p>
                                <p>Post title: {post.title}</p>
                                <p> Post Description: {post.description} </p>

                                <UpdatePostViews
                                    key={post._id+1}
                                    post = {post}
                                    onClickPostUpdateViews={this.updateViews }

                                />
                                
                                {
                                    Meteor.user() && Meteor.user()._id==post.userId ?
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
                    

                {
                    Meteor.user() ? (<div><button onClick={ this.redirectCreate }>Create a new post</button><button onClick={ this.redirectLogout }>Logout</button></div>)
                        : ''
                }

            </div>
        )
    }
}

const postSet = new ReactiveVar([]);
export default withTracker(props => {
    const handle = Meteor.subscribe('posts');
    Meteor.call('secured.post_list', (err, posts) => {
        postSet.set(posts);
    });

    return {
        loading: !handle.ready(),
        posts : postSet.get(),
        ...props
    };
})(PostListReactive);

