const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const statusController = require('../controllers/status.controller');

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
], taskController.addTask);

/**
 * @route GET api/tasks
 * @desc Get all tasks
 * @access Public
 *  */
router.get('/', taskController.getAllTask);

/**
 * @route GET api/tasks/:id
 * @desc Get a task by id
 * @access Public
 * */
router.get('/:id', taskController.getTaskDetails);

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
], taskController.updateTask);

/**
 * @route DELETE api/tasks/:id
 * @desc Delete a task
 * @access Public
 * */
router.delete('/:id', taskController.deleteTask);

/**
 * @route GET api/tasks/search/:title
 * @desc search tasks by title
 * @access Public
 */
router.get('/search/:title', taskController.taskSearch);

/**
 * @route GET api/tasks/sort
 * @desc sort tasks by start date, due date, done date
 * @access Public
 */
router.get('/sort', taskController.sortTask);

/**
 * @route PUT api/tasks/markAsDone/:id
 * @descp mark as done date
 * @access Public
*/
router.put('/markAsDone/:id', statusController.markAsDone);

/**
 * @route UPDATE api/tasks/status/:id
 * @desc change task status
 * @access Public
*/
router.put('/status/:id', statusController.updateTaskStatus);

/**
 * @route GET api/tasks/status/:status
 * @desc filter tasks by status
 * @access Public
*/
router.get('/status/:status', statusController.getTaskStatus);

module.exports = router;