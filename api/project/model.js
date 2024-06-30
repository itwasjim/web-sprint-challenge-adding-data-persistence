// build your `Project` model here
const db = require('../../data/dbConfig');

function add(project) {
  return db('projects').insert(project).returning('*').then(rows => rows[0]);
}

function getAll() {
  return db('projects');
}

module.exports = {
  add,
  getAll,
};