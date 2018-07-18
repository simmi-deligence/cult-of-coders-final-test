import React from 'react';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
        this.updateViews.bind(this);
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });
    }

    updateViews(post){
        // Update user views
         Meteor.call('post.update', this.props.match.params._id,post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            else
            {
                this.props.history.push("/posts/view/" + post._id);
            }
        });

    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;
        const pStyle = {
            backgroundColor: '#ccc',
            textAlign: 'center'
        };
        var datestr = 'No date';
        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                           
                                <p>Post id: {post._id} </p>
                                <p>Type : { post.type}</p>
                                <p>Post title: {post.title}</p>
                                <p> Post Description: {post.description} </p>

                             <button  onClick={()=>{this.updateViews(post)}}>View Details
                            </button>
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
