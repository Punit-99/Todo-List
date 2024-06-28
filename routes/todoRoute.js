// todoRoute.js

const express = require("express");
const router = express.Router();
const Task = require("../models/todoSchema");
const path = require("path");

//Home page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Get all task
router.get("/task", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add a task  POST
router.post("/task", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    checked: req.body.checked,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status().json({ message: error.message });
  }
});

//update a task
router.patch("/task/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const updateTask = await Task.findByIdAndUpdate(
      taskId,
      { checked: req.body.checked },
      { new: true }
    );
    res.json(updateTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete a task
router.delete("/task/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const deleteTask = await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully", deleteTask });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
