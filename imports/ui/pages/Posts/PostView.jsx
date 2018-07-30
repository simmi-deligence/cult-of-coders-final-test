import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts, Comments } from '/db';
import CommentCreate from './PostComment';
import { ReactiveVar } from 'meteor/reactive-var';


class PostView extends React.Component {
    constructor(){
        super();
        this.state = { post : null }
        this.redirectLogout.bind(this);
        this.redirectLogin.bind(this);
        this.redirectList.bind(this);
    }

    componentDidMount() {
        Meteor.call('secured.post_update', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
    }

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
    render() {
        
        const { post,commentCount,history } = this.props;
        if(this.state.post)
            this.props.post = this.state.post;
       

        if(post)
        {
            datestr = 0;
            if(post.createdAt)
            {
                date = new Date(post.createdAt);
                datestr = date.toDateString();
            }

           
            return (
                <div className="post">
                    {
                        <div key={post._id}>

                            <header>
                                {
                                    Meteor.user() ? (<button onClick={ this.redirectLogout }>Logout</button>) : <button onClick={ this.redirectLogin }>Login</button>}
                                <h4>Post Details </h4>
                            </header>

                            <p>Post id: {post._id} </p>
                            <p>Type : { post.type}</p>
                            <p>Post title: {post.title}, Post Description: {post.description} </p>
                            <p>Date : {datestr } </p>
                            <p>User Views : {post.views } </p>
                            <p> Total Comments: {post.comments ? _.size(post.comments) : 0}</p>
                            <hr/>
                            {/*Comment box here*/}

                            { Meteor.user() ?  <CommentCreate {...this.props}  /> : ''}
                    
                            {/*Comment end here*/}
                            <button onClick={ this.redirectList }>Back to listing </button>
                        </div>
                    
                    }
                </div>
            );
        }
        else
        { return <div>{history.push('/posts/reactive')}</div> }
       
    }
}

const postSet = new ReactiveVar([]);
export default withTracker(props => {
    const handle = Meteor.subscribe('posts');
    Meteor.subscribe('comments');

    Meteor.call('secured.post_get',props.match.params._id,(err,post)=>{
        postSet.set(post);
    })

    return {
        loading: !handle.ready(),
        post: postSet.get(),
        // commentCount : Object.size(props.post.comments),
        ...props
    };
})(PostView);