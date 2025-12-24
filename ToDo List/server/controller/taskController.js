import Task from '../models/task.js';

// --- CREATE a new task ---
export const addTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const newTask = new Task({
      title: title,
      description: description,
      status: status,
      dueDate: dueDate
    });
    // Save the new task to the database
    const savedTask = await newTask.save();
    // Send a 201 Created status and the new task data
    res.status(201).json({ success: true, message: 'New task successfully added.', task: savedTask });
  } catch (err) {
    // Handle validation errors or other bad requests
    res.status(400).json({ success: false, message: err.message });
  }
};

// READ all tasks
export const getAllTask = async (req, res) => {
  try {
    // Find all tasks in the database
    const tasks = await Task.find();
    // Send a 200 OK status and the list of tasks
    res.status(200).json({ success: true, message: 'Tasks retrieved successfully.', tasks: tasks });
  } catch (error) {
    // Handle potential server errors
    res.status(500).json({ success: false, message: 'Error fetching tasks.' });
  }
};

// READ a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    // If no task is found, return a 404 Not Found error
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    // Send a 200 OK status and the found task
    res.status(200).json({ success: true, message: 'Task found.', task: task });
  } catch (error) {
    // Handle potential server errors (e.g., malformed ID)
    res.status(500).json({ success: false, message: 'Error fetching task.' });
  }
};

// UPDATE a task by ID
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    // Find the task and update it with the request body
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });
    // If no task is found, return a 404 Not Found error
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    // Send a 200 OK status and the updated task
    res.status(200).json({ success: true, message: 'Task updated successfully.', task: task });
  } catch (error) {
    // Handle potential validation errors or other bad requests
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE a task by ID
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    // If no task is found, return a 404 Not Found error
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    // Send a 200 OK status and a success message
    res.status(200).json({ success: true, message: 'Task deleted successfully.' });
  } catch (error) {
    // Handle potential server errors
    res.status(500).json({ success: false, message: 'Error deleting task.' });
  }
};
