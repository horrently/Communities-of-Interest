module.exports = (app) => {
    const community_interests = require('../controller/community_interests');

    app.get('/api/community_interests', community_interests.findAll);
    app.post('/api/community_interests', community_interests.create);
    app.delete('/api/community_interests/:community_id/:interest_id', community_interests.delete);
};
