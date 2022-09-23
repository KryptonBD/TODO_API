const mongodb = require('../config/db');

const markAsDone = (req, res) => {
    const result = mongodb.db().collection('tasks').updateOne({ _id: req.params.id }, { $set: { doneDate: new Date() } });
    result.then((data) => {
        res.status(200).json({ msg: 'Task marked as done successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while updating data' });
    });
}

const updateTaskStatus = (req, res) => {
    const result = mongodb.db().collection('tasks').updateOne({ _id: req.params.id }, { $set: { status: req.body.status } });
    result.then((data) => {
        res.status(200).json({ msg: 'Task status updated successfully' });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while updating data' });
    });
}

const getTaskStatus = (req, res) => {
    const result = mongodb.db().collection('tasks').find({ status: req.params.status }).toArray();
    result.then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: 'Server error while fetching data' });
    });
}

module.exports = {
    markAsDone,
    updateTaskStatus,
    getTaskStatus
}