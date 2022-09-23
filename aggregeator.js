const express = require('express');
const { check, validationResult } = require('express-validator');
const mongodb = require('./config/db');
const router = express.Router();

/**
 * @route POST aggregeator/projects
 * @desc project with dueDate today
 * @access Public
 * */
router.post('/projects', (req, res) => {
    const result =  mongodb.db().collection('projects').aggregate([
        {
            $match: {
                dueDate: req.body.dueDate
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
 * @route POST aggregeator/tasks
 * @desc tasks with dueDate today
 * @access Public
 * */
router.post('/tasks', (req, res) => {
    const result = mongodb.db().collection('tasks').aggregate([
        {
            $match: {
                dueDate: req.body.dueDate
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