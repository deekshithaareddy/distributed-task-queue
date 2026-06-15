import exp from "express";
import { taskmodel } from "../models/taskModel";
export const taskApp=exp.Router();

// create a task
taskApp.post("/task",async(req,res)=>{
    const taskObj = req.body;
    const taskDoc = new taskmodel(taskObj);
    await taskDoc.save();
    return res.status(201).json({message:"task created",payload:taskDoc});
})

// get all tasks
taskApp.get("/task",async(req,res)=>{
    const taskList = await taskmodel.find()
    return res.status(200).json(taskList);
})

// get one task
taskApp.get("/task:id",async(req,res)=>{
    const taskId = req.params.id;
    const task = await taskmodel.find({id:taskId})
    return res.status(200).json(task);
})