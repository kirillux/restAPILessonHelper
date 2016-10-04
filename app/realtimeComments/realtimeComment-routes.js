/**
 * Created by Kirill on 10/4/2016.
 */
const Path = require('path');
const realtimeCommentRoutes = [
    {
        method: 'GET',
        path: '/livecomments',
        handler: {
            file: 'comments.html'
        },
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Server upload html file',
            notes: 'Html file for uploading files',
        }
    },
];
module.exports = realtimeCommentRoutes;