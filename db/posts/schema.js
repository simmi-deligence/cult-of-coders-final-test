import SimplSchema from 'simpl-schema';

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
    	optional: true
    },
    type: {
        type: String
        //optional: true
    },
});