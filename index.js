const express = require('express');
const bp = require('body-parser');
const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    next();
});

app.use('/api/tasks', require('./routes/task.router'));
app.use('/api/projects', require('./routes/project.router'));
app.use('/aggregeator', require('./aggregeator'));

app.listen(3000, () => {
    console.log('Server is running at 3000');
});