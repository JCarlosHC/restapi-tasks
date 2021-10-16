import Task from '../models/Task';
import {getPagination} from '../libs/getPagination'

export const findAllTasks = async (req, res) => {
    // Investigar sobre expresspromiserouter
    const {size, page, title} = req.query;
    const condition = title ? {
        title: {$regex: new RegExp(title), $options: "i"}
    } : {};

    const {limit, offset} = getPagination(page,size);
    const data = await Task.paginate(condition,{ offset, limit}); //Task.find();
    res.json(data);
}

export const findOneTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.json(task);
}

export const findAllDoneTasks = async (req, res) => {
    const tasks = await Task.find({ done: true });
    res.json(tasks);
}

export const createTask = async (req, res) => {
    //Implementar e investigar sobre express-validator
    const newTask = new Task({ 
        title: req.body.title, 
        description: req.body.description,
        done: req.body.done ?  req.body.done :  false 
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    res.json({
        message: `Task id ${id} was deleted successfully`,
        data: task
    });
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const updateTask = await Task.findByIdAndUpdate(id, req.body);
    res.json({message: 'Task was updated'});
}
