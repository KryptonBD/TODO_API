const express = require('express');
const mongodb = require('./db');
const bp = require('body-parser');
const app = express();

mongodb.connectToServer(function (err) {
    if (err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log('Server is running at 3000');
    });
});

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  next();
});


app.use('/api/tasks', require('./routes/task'));
app.use('/api/projects', require('./routes/project'));
app.use('/aggregeator', require('./aggregeator'));
