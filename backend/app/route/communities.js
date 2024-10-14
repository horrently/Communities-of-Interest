module.exports = (app) => {
    const communities = require('../controller/communities');

    app.get('/api/communities', communities.findAll);
    app.post('/api/communities', communities.create);
    app.put('/api/communities/:id', communities.update);
    app.delete('/api/communities/:id', communities.delete);
    app.get('/api/communities/:id', communities.findById);
    app.get('/api/communities/filtered/:user_id', communities.findFilteredCommunities);
};
