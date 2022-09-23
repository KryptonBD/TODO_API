const express = require('express');
const { check, validationResult } = require('express-validator');
const mongodb = require('../db');
const router = express.Router();

/**
 * @route POST api/projects
 * @desc Create a project
 * @access Public
*/
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('dueDate', 'Due date is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructuring the request body
    const { title, description, startDate, dueDate } = req.body;
    const project = {
        title,
        description,
        startDate,
        dueDate
    };
    //inserting the project into the collection
    const db = mongodb.getDb();
    const result = db.collection('projects').insertOne(project);
    result.then((data) => {
        res.status(201).json({ msg: 'Project created successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while adding data' });
    });
});

/**
 * @route GET api/projects
 * @desc Get all projects
 * @access Public
 * */
router.get('/', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('projects').find().toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});

/**
 * @route GET api/projects/:id
 * @desc Get a project by id
 * @access Public
 * */
router.get('/:id', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('projects').findOne({ _id: mongodb.ObjectId(req.params.id) });
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});

/**
 * @route PUT api/projects/:id
 * @desc Update a project
 * @access Public
 * */
router.put('/:id', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('dueDate', 'Due date is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructuring the request body
    const { title, description, startDate, dueDate } = req.body;
    const project = {
        title,
        description,
        startDate,
        dueDate
    };
    //updating the project into the collection
    const db = mongodb.getDb();
    const result = db.collection('projects').updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: project });
    result.then((data) => {
        res.status(200).json({ msg: 'Project updated successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while updating data' });
    });
});

/**
 * @route DELETE api/projects/:id
 * @desc Delete a project
 * @access Public
 * */
router.delete('/:id', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('projects').deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    result.then((data) => {
        res.status(200).json({ msg: 'Project deleted successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while deleting data' });
    });
});

/**
 * @route GET api/projects/:id/tasks
 * @desc Get all tasks of a project
 * @access Public
 * */
router.get('/:id/tasks', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').find({ projectId: req.params.id }).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});

/**
 * @route POST api/projects/:id/tasks
 * @desc Assign exisiting task to a project
 * @access Public
 * */
router.post('/:id/tasks', [
    check('taskId', 'Task id is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructuring the request body
    const { taskId } = req.body;
    const db = mongodb.getDb();
    const result = db.collection('tasks').updateOne({ _id: mongodb.ObjectId(taskId) }, { $set: { projectId: req.params.id } });
    result.then((data) => {
        res.status(200).json({ msg: 'Task assigned successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while assigning task' });
    });
});

/**
 * @route DELETE api/projects/:id/tasks/:taskId
 * @desc Remove a task from a project
 * @access Public
 * */
router.delete('/:id/tasks/:taskId', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').updateOne({ _id: mongodb.ObjectId(req.params.taskId) }, { $set: { projectId: null } });
    result.then((data) => {
        res.status(200).json({ msg: 'Task removed successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while removing task' });
    });
});

/**
 * @route GET api/projects/:projectName/tasks
 * @desc filter task by project name
 * @access Public
 * */
router.get('/:projectName/tasks', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').aggregate([
        {
            $lookup: {
                from: 'projects',
                localField: 'projectId',
                foreignField: '_id',
                as: 'project'
            }
        },
        {
            $match: {
                'project.title': req.params.projectName
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
 * @route GET api/projects/sort/:sortBy
 * @desc sort by due date, start date
 * @access Public
 * */
router.get('/sort/:sortBy',[
    check('sortBy', 'Sort by is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const db = mongodb.getDb();
    const result = db.collection('projects').find().sort({ [req.params.sortBy]: 1 }).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});


module.exports = router;