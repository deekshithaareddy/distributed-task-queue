import { taskModel } from "../models/taskModel.js";
import { taskQueue } from "../queues/taskQueue.js";

export const createTask = async (req, res) => {
  try {
    const { title, type } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title required",
      });
    }

    const task = await taskModel.create({
      title,
      type,
      userId: req.user.id,
    });

    await taskQueue.add("process-task", {
      taskId: task._id.toString(),
    });

    res.status(201).json({
      message: "Task created",
      payload: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({
      userId: req.user.id,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};