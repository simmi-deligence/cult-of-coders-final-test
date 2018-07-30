import React from 'react';

class DeletePost extends React.Component {
    constructor(...props) {
        super(...props);
        this.onClickRemove = this.onClickRemove.bind(this);
    }

    onClickRemove(){
 
        if(this.props)
            this.props.onClickRemovePostAndComments(this.props.id);
    }

    render()
    {
        return (
            <div>
                {
                    (<button onClick={ this.onClickRemove } type="button">Delete Post</button>)
                }
            </div>
        );
    }
}


export default DeletePost;