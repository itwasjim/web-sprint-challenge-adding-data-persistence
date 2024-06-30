// build your `Task` model here
const db = require('../../data/dbConfig');

function add(task) {
  return db('tasks').insert(task).returning('*').then(rows => rows[0]);
}

function getAll() {
  return db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select('t.*', 'p.project_name', 'p.project_description');
}

module.exports = {
  add,
  getAll,
};