// build your `/api/tasks` router here
const express = require('express');
const router = express.Router();
const db = require('../../data/dbConfig');

router.get('/', async (req, res) => {
  try {
    const tasks = await db('tasks as t')
      .join('projects as p', 't.project_id', 'p.project_id')
      .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description');
    const formattedTasks = tasks.map(task => ({
      ...task,
      task_completed: !!task.task_completed
    }));
    res.status(200).json(formattedTasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { task_description, task_notes, project_id } = req.body;
    if (!task_description) {
      return res.status(400).json({ message: 'Task description is required' });
    }
    if (!project_id) {
      return res.status(400).json({ message: 'Project ID is required' });
    }
    const [newTask] = await db('tasks').insert({ task_description, task_notes, task_completed: false, project_id }, ['task_id', 'task_description', 'task_notes', 'task_completed', 'project_id']);
    res.status(201).json({
      ...newTask,
      task_completed: !!newTask.task_completed
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

module.exports = router;