const mongodb = require('../config/db');
const { validationResult } = require('express-validator');

const addProject = (req, res) => {
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
    const result = mongodb.db().collection('projects').insertOne(project);
    result.then((data) => {
        res.status(201).json({ msg: 'Project created successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while adding data' });
    });
}

const getAllProject = (req, res) => {
    const result = mongodb.db().collection('projects').find().toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

const getProjectDetails = (req, res) => {
    const result = mongodb.db().collection('projects').findOne({ _id: req.params.id });
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

const updateProject = (req, res) => {
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
    const result = mongodb.db().collection('projects').updateOne({ _id: req.params.id }, { $set: project });
    result.then((data) => {
        res.status(200).json({ msg: 'Project updated successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while updating data' });
    });
}

const deleteProject = (req, res) => {
    const result = mongodb.db().collection('projects').deleteOne({ _id: req.params.id });
    result.then((data) => {
        res.status(200).json({ msg: 'Project deleted successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while deleting data' });
    });
}

const getAllTask = (req, res) => {
    const result = mongodb.db().collection('tasks').find({ projectId: req.params.id }).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

const assignTask = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // destructuring the request body
    const { taskId } = req.body;
    const result = mongodb.db().collection('tasks').updateOne({ _id: taskId }, { $set: { projectId: req.params.id } });
    result.then((data) => {
        res.status(200).json({ msg: 'Task assigned successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while assigning task' });
    });
}

const removeTask = (req, res) => {
    const result = mongodb.db().collection('tasks').updateOne({ _id: req.params.taskId }, { $set: { projectId: null } });
    result.then((data) => {
        res.status(200).json({ msg: 'Task removed successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while removing task' });
    });
}

const filterTask = (req, res) => {
    const result = mongodb.db().collection('tasks').aggregate([
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
}

const sortProject = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const result = mongodb.db().collection('projects').find().sort({ [req.params.sortBy]: 1 }).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

module.exports = {
    addProject,
    getAllProject,
    getProjectDetails,
    updateProject,
    deleteProject,
    getAllTask,
    assignTask,
    removeTask,
    filterTask,
    sortProject
}