module.exports = (app) => {
    const community_members = require('../controller/community_members');

    app.get('/api/community_members', community_members.findAll);
    app.post('/api/community_members', community_members.create);
    app.delete('/api/community_members/:user_id/:community_id', community_members.delete);
};
