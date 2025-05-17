const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    userID: {type: String, required: true},
    taskName: {type: String, required: true},
    dueDate: {type: String, required: true},
    isPrior: {type: Boolean, required: true}
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = TaskModel;