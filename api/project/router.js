// build your `/api/projects` router here
const express = require('express');
const router = express.Router();
const db = require('../../data/dbConfig');


router.get('/', async (req, res) => {
  try {
    const projects = await db('projects');
    const formattedProjects = projects.map(project => ({
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: Boolean(project.project_completed) // Convert project_completed to boolean
    }));
    res.status(200).json(formattedProjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get projects' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { project_name, project_description, project_completed } = req.body;
    if (!project_name) {
      return res.status(400).json({ message: 'Project name is required' });
    }
    const newProject = {
      project_name,
      project_description,
      project_completed: project_completed !== undefined ? project_completed : false 
    };
    const [createdProject] = await db('projects').insert(newProject, ['project_id', 'project_name', 'project_description', 'project_completed']);
    
    
    res.status(201).json({
      project_id: createdProject.project_id,
      project_name: createdProject.project_name,
      project_description: createdProject.project_description,
      project_completed: Boolean(createdProject.project_completed) 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

module.exports = router;