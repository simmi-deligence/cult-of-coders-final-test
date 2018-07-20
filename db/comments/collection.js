import { Mongo } from 'meteor/mongo';
import PostSchema from './schema';

const Comments = new Mongo.Collection('comments');
Comments.attachSchema(PostSchema);

export default Comments;