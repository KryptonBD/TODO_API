const express = require('express');
const { check, validationResult } = require('express-validator');
const mongodb = require('../db');
const router = express.Router();


/**
 * @route POST api/tasks
 * @desc Create a task
 * @access Public
 */
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
    check('priority', 'Priority is required').not().isEmpty(),
    check('startDate', 'Due date is required').not().isEmpty(),
    check('dueDate', 'Due date is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructuring the request body
    const { title, description, startDate, dueDate, priority, status } = req.body;
    const task = {
        title,
        description,
        startDate,
        dueDate,
        priority,
        status
    };
    //inserting the task into the collection
    const db = mongodb.getDb();
    const result = db.collection('tasks').insertOne(task);

    result.then((data) => {
        res.status(201).json({ msg: 'Task created successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while adding data' });
    });
});

/**
 * @route GET api/tasks
 * @desc Get all tasks
 * @access Public
 *  */
router.get('/', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').find().toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});

/**
 * @route GET api/tasks/:id
 * @desc Get a task by id
 * @access Public
 * */
router.get('/:id', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').findOne({ _id: mongodb.ObjectId(req.params.id) });
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});

/**
 * @route PUT api/tasks/:id
 * @desc Update a task
 * @access Public
 * */
router.put('/:id', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
    check('priority', 'Priority is required').not().isEmpty(),
    check('startDate', 'Due date is required').not().isEmpty(),
    check('dueDate', 'Due date is required').not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructuring the request body
    const { title, description, startDate, dueDate, priority, status } = req.body;
    const task = {
        title,
        description,
        startDate,
        dueDate,
        priority,
        status
    };
    //inserting the task into the collection
    const db = mongodb.getDb();
    const result = db.collection('tasks').updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: task });
    result.then((data) => {
        res.status(200).json({ msg: 'Task updated successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while updating data' });
    });
});

/**
 * @route DELETE api/tasks/:id
 * @desc Delete a task
 * @access Public
 * */
router.delete('/:id', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').deleteOne({ _id: mongodb.ObjectId(req.params.id) });
    result.then((data) => {
        res.status(200).json({ msg: 'Task deleted successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while deleting data' });
    });
});

/**
 * @route PUT api/tasks/markAsDone/:id
 * @descp mark as done date
 * @access Public
*/
router.put('/markAsDone/:id', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: { doneDate: new Date() } });
    result.then((data) => {
        res.status(200).json({ msg: 'Task marked as done successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while updating data' });
    });
});

/**
 * @route UPDATE api/tasks/status/:id
 * @desc change task status
 * @access Public
*/
router.put('/status/:id', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: { status: req.body.status } });
    result.then((data) => {
        res.status(200).json({ msg: 'Task status updated successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while updating data' });
    });
});

/**
 * @route GET api/tasks/status/:status
 * @desc filter tasks by status
 * @access Public
*/
router.get('/status/:status', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').find({ status: req.params.status }).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});

/**
 * @route GET api/tasks/search/:title
 * @desc search tasks by title
 * @access Public
 */
router.get('/search/:title', (req, res) => {
    const db = mongodb.getDb();
    const result = db.collection('tasks').find({ title: { $regex: req.params.title, $options: 'i' } }).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});

/**
 * @route GET api/tasks/sort
 * @desc sort tasks by start date, due date, done date
 * @access Public
 */
router.get('/sort', (req, res) => {
    //get date type from body
    const { dateType } = req.body;
    const db = mongodb.getDb();
    let param;
    if(dateType === 'startDate'){
        param = { startDate: req.params.sort }
    }
    else if(dateType === 'dueDate'){
        param = { dueDate: req.params.sort }
    }
    else if(dateType === 'doneDate'){
        param = { doneDate: req.params.sort }
    }
    const result = db.collection('tasks').find().sort(param).toArray();

    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
});


module.exports = router;