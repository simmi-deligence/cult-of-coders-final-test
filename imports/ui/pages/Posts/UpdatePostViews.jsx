import React from 'react';
class UpdatePostViews extends React.Component {
    constructor(...props) {
        super(...props);
        this.onClickUpdateViews = this.onClickUpdateViews.bind(this);
    }

    onClickUpdateViews(){
        if(this.props)
            this.props.onClickPostUpdateViews(this.props.post);
    }

    render()
    {
        return (
            <div>
                {
                    (<button  onClick={this.onClickUpdateViews}>View Details </button>)
                }
            
            </div>
        );
    }
}

export default UpdatePostViews;
