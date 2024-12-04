var express = require('express');
const { requestAll, deleteTask, updateTask, createTask } = require('../db/requests');
var router = express.Router();

/* GET users tasks. */
router.get('/', (req, res, next) => {
  const userId = req.user.id;

  requestAll('tasks', userId, (err, tasks) => {
    if (err) return next(err);
    res.send(tasks);
  });
});

router.delete('/:id', function (req, res, next) {
  const taskId = req.params.id;

  deleteTask('tasks', taskId, (err) => {
    if (err) return next(err);
    res.sendStatus(204);
  });
});

router.put('/:id', function (req, res, next) {
  const task = req.body;

  updateTask('tasks', task, (err, task) => {
    if (err) return next(err);
    res.send(task);
  });
});

router.post('/new', function (req, res, next) {
  const task = req.body;
  const userId = req.user.id;

  createTask('tasks', task, userId, (err, task) => {
    if (err) return next(err);
    res.send(task);
  })
});

module.exports = router;