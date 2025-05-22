const { Router } = require("express");
const TaskModel = require("../Model/tasksModel.js");

const taskRouter = Router();

taskRouter.post("/add", async (req, res) => {
  const { userID, taskName, dueDate, isPrior, isComplete, isPending } = req.body;
  try {
    const newTask = await TaskModel({ userID, taskName, dueDate, isPrior, isComplete, isPending });
    await newTask.save();
    res.status(200).send({msg: "Task added successfully."})
  } catch (error) {
    console.log(error);
    res.status(400).send({msg : "Something went wrong!"});
  }
});

taskRouter.patch("/edit/task/:id", async(req,res)=>{
  const {id} = req.params;
  const taskToEdit = await TaskModel.findOne({id: req.body.taskID});
    try {
      await TaskModel.findByIdAndUpdate({_id: id}, req.body);
      res.status(200).send({msg: `The task with ID: ${id} has been udpated.`})
    } catch (error) {
      res.status(400).send({error: error.message})
    }
});

taskRouter.delete("/delete/task/:id", async(req, res)=>{
  const {id} = req.params;
  if(id){
    try {
      await TaskModel.findByIdAndDelete({_id: id});
      res.status(200).send({msg: `Task with ID: ${id} has been deleted.`})
    } catch (error) {
      res.status(400).send({msg: error.message})
    }
  }
});

taskRouter.get("/all", async (req, res) => {
  const { userID, userEmail } = req.body;
  console.log(req.body, "body")
  const allTasks = await TaskModel.find({ userID });
  if(allTasks.length){
    const relvantTasks = allTasks.filter((el)=> el.userID == userID);
    res.status(200).send(relvantTasks)
  } else {
    res.status(200).send({msg: "No tasks added yet."})
  }
});

module.exports = taskRouter;
