module.exports = (app) => {
    const interests = require('../controller/interests');

    app.get('/api/interests', interests.findAll);
    app.post('/api/interests', interests.create);
    app.put('/api/interests/:id', interests.update);
    app.delete('/api/interests/:id', interests.delete);
    app.get('/api/interests/:id', interests.findById);
};
