const express = require('express');
const { check, validationResult } = require('express-validator');
const mongodb = require('./db');
const router = express.Router();

/**
 * @route POST aggregeator/projects
 * @desc project with dueDate today
 * @access Public
 * */
router.post('/projects', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('projects').aggregate([
        {
            $match: {
                dueDate: new Date().getTime()
            }
        }
    ]).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});

/**
 * @route GET aggregeator/tasks
 * @desc tasks with dueDate today
 * @access Public
 * */
router.get('/tasks', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').aggregate([
        {
            $match: {
                dueDate: new Date()
            }
        }
    ]).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});


module.exports = router;