import Users from './collection.js';
import Comments from '/db/comments/collection.js';
import Posts from '/db/posts/collection.js';

Users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'author',
        autoremove: true
    },
    'comments': {
        inversedBy: 'user',
        collection: Comments,
        
    },
})