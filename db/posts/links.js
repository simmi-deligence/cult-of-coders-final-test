import Posts from './collection.js';
import Users from '/db/users/collection.js';
import Comments from '/db/comments/collection.js';

Posts.addLinks({
    'author': {
        type: 'one',
        collection: Users,
        field: 'userId',
        index: true
    },
    'comments': {
        collection: Comments,
        inversedBy: 'post',
        autoremove: true
    },
})

