module.exports = (app) => {
    const posts = require('../controller/posts');

    app.get('/api/posts', posts.findAll);
    app.post('/api/posts', posts.create);
    app.put('/api/posts/:id', posts.update);
    app.delete('/api/posts/:id', posts.delete);
    app.get('/api/posts/:id', posts.findById);
    app.get('/api/posts/community/:community_id', posts.findByCommunityId);
};
