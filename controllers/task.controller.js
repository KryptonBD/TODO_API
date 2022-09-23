const mongodb = require('../config/db');
const { validationResult } = require('express-validator');

const addTask = (req, res) =>{
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
    const result = mongodb.db().collection('tasks').insertOne(task);
    result.then((data) => {
        res.status(201).json({ msg: 'Task created successfully' });
    }).catch((err) => {
        res.status(500).json({ msg: 'Server error while adding data' });
    });
}

const getAllTask = (req, res) => {
    const result = mongodb.db().collection('tasks').find().toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

const getTaskDetails = (req, res) => {
    const result = mongodb.db().collection('tasks').findOne({ _id: req.params.id });
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

const updateTask = (req, res) => {
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
    const result = mongodb.db().collection('tasks').updateOne({ _id: req.params.id }, { $set: task });
    result.then((data) => {
        res.status(200).json({ msg: 'Task updated successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while updating data' });
    });
}

const deleteTask = (req, res) => {
    const result = mongodb.db().collection('tasks').deleteOne({ _id: req.params.id });
    result.then((data) => {
        res.status(200).json({ msg: 'Task deleted successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while deleting data' });
    });
}

const taskSearch = (req, res) => {
    const result = mongodb.db().collection('tasks').find({ title: { $regex: req.params.title, $options: 'i' } }).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

const sortTask = (req, res) => {
    //get date type from body
    const { dateType } = req.body;
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
    
    const result = mongodb.db().collection('tasks').find().sort(param).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

module.exports = {
    addTask,
    getAllTask,
    getTaskDetails,
    updateTask,
    deleteTask,
    taskSearch,
    sortTask
}