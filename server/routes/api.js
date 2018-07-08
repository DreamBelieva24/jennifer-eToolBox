const express = require('express');
const taskController = require("../../controllers/taskController");

const router = new express.Router();

router
  .route("/subscriptions")
  .get(taskController.findAll)
  .post(taskController.create);

router
  .route("/subscriptions/:id")
  .get(taskController.findById)
  .put(taskController.update)
  .delete(taskController.remove);

  router
  .route("/task/:id/:count")
  .get(taskController.findById)
  .put(taskController.update)
  .delete(taskController.remove);

router
  .route("/getUser")
  .get(taskController.getUser);


module.exports = router;
