import _ from 'underscore';
import SimplSchema from 'simpl-schema';
import PostTagsEnum from './enum/tags';


export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views : {
    	type : Number,
    	defaultValue : 0,
    	optional: true
    },
    createdAt : {
    	type : Date,
    	autoValue: function()
        {
            console.log(this.isSet)
            if (!this.operator) {
                if (!this.isSet || this.value === null || this.value === "")
                return new Date();
            }
            else
            {
                this.unset();
            }
        }
    },

    type: {
        type: String,
        allowedValues : _.values(PostTagsEnum)
    },

    'type.$': {
        type: String,
        allowedValues : _.values(PostTagsEnum)
    }
});