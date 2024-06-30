// build your `/api/resources` router here
const express = require('express');
const router = express.Router();
const db = require('../../data/dbConfig');

router.get('/', async (req, res) => {
  try {
    const resources = await db('resources');
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get resources' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { resource_name, resource_description } = req.body;
    if (!resource_name) {
      return res.status(400).json({ message: 'Resource name is required' });
    }
    const [newResource] = await db('resources').insert({ resource_name, resource_description }, ['resource_id', 'resource_name', 'resource_description']);
    res.status(201).json(newResource);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create resource' });
  }
});

module.exports = router;
