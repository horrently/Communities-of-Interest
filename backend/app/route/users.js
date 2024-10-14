module.exports = (app) => {
    const users = require('../controller/users');
    
    app.get('/api/users', users.findAll);
    app.post('/api/users', users.create);
    app.put('/api/users/:id', users.update);
    app.delete('/api/users/:id', users.delete);
    app.get('/api/users/:id', users.findById);
};
