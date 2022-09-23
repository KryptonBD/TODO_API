const express = require('express');
const { check, validationResult } = require('express-validator');
const mongodb = require('../config/db');
const router = express.Router();
const projectController = require('../controllers/project.controller');

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
], projectController.addProject);

/**
 * @route GET api/projects
 * @desc Get all projects
 * @access Public
 * */
router.get('/', projectController.getAllProject);

/**
 * @route GET api/projects/:id
 * @desc Get a project by id
 * @access Public
 * */
router.get('/:id', projectController.getProjectDetails);

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
], projectController.updateProject);

/**
 * @route DELETE api/projects/:id
 * @desc Delete a project
 * @access Public
 * */
router.delete('/:id', projectController.deleteProject);

/**
 * @route GET api/projects/:id/tasks
 * @desc Get all tasks of a project
 * @access Public
 * */
router.get('/:id/tasks', projectController.getAllTask);

/**
 * @route POST api/projects/:id/tasks
 * @desc Assign exisiting task to a project
 * @access Public
 * */
router.post('/:id/tasks', [
    check('taskId', 'Task id is required').not().isEmpty()
], projectController.assignTask);

/**
 * @route DELETE api/projects/:id/tasks/:taskId
 * @desc Remove a task from a project
 * @access Public
 * */
router.delete('/:id/tasks/:taskId', projectController.removeTask);

/**
 * @route GET api/projects/:projectName/tasks
 * @desc filter task by project name
 * @access Public
 * */
router.get('/:projectName/tasks', projectController.filterTask);

/**
 * @route GET api/projects/sort/:sortBy
 * @desc sort by due date, start date
 * @access Public
 * */
router.get('/sort/:sortBy', [
    check('sortBy', 'Sort by is required').not().isEmpty()
], projectController.sortProject);

module.exports = router;