const router = require("express").Router();
const taskRoutes = require("./task");

// Task routes
router.use("/task", taskRoutes);

module.exports = router;
