// build your server here and require it from index.js
const express = require('express');
const projectsRouter = require('./project/router');

const resourcesRouter = require('./resource/router');
const tasksRouter = require('./task/router');

const server = express();

server.use(express.json());

server.use('/api/resources', resourcesRouter);
server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: "up" })
});

module.exports = server;