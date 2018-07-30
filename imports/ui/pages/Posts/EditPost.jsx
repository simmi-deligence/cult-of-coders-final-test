
import React from 'react';
class EditPost extends React.Component {
    constructor(...props) {
        super(...props);
        this.onClickEdit = this.onClickEdit.bind(this);
    }

    onClickEdit(){
 
        if(this.props)
            this.props.onClickEditPost(this.props.id);
    }

    render()
    {
        return (
            <div>
                {
                    (<button onClick={ this.onClickEdit } type="button">Edit Post</button>)
                }
            
            </div>
        );
    }
}

export default EditPost;