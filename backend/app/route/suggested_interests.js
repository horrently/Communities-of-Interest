module.exports = (app) => {
    const suggested_interests = require('../controller/suggested_interests');

    app.get('/api/suggested_interests', suggested_interests.findAll);
    app.post('/api/suggested_interests', suggested_interests.create);
    app.put('/api/suggested_interests/approve/:id', suggested_interests.approve);
    app.delete('/api/suggested_interests/:id', suggested_interests.reject);
};
