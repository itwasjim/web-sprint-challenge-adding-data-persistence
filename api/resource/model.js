// build your `Resource` model here
const db = require('../../data/dbConfig');

function add(resource) {
  return db('resources').insert(resource).returning('*').then(rows => rows[0]);
}

function getAll() {
  return db('resources');
}

module.exports = {
  add,
  getAll,
};