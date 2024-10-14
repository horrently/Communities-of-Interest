module.exports = (app) => {
    const user_interests = require('../controller/user_interests');

    app.get('/api/user_interests', user_interests.findAll);
    app.post('/api/user_interests', user_interests.create);
    app.delete('/api/user_interests/:user_id/:interest_id', user_interests.delete);
};
