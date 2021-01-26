const express = require('express')
const todos = express.Router()
const TodoTask = require('../models/TodoTask')

todos.get('/', async (req, res) => {
    if(req.query.type === "json") {
        const todoTasks = await TodoTask.find().sort({ date: 'desc' })
        res.json(todoTasks)
    } else {
        const todoTasks = await TodoTask.find().sort({ date: 'desc' })
        res.render('todos.ejs', {todoTasks: todoTasks})
    }
})

todos.post('/', async (req, res) => {
    const todoTask = new TodoTask({content: req.body.content});
    try {
        await todoTask.save();
        res.redirect('/');
    } catch (err) {
        res.redirect('/');
    }
})

todos.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
    if (err) return res.send(500, err);
    res.redirect("/");
    });
    });
module.exports = todos;