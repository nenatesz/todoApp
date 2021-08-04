const express = require('express');
const {getAllTodos, postTodoItem, deleteTodoItem, editTodoItem, getOneTodoItem} = require("../functions/todos.function");
const isUserAuth = require('../utils/auth');



const todosRouter = express.Router();

todosRouter.get('/get_todo', isUserAuth, getAllTodos);
todosRouter.get('/get_todo/:todoId', isUserAuth, getOneTodoItem);
todosRouter.post('/post_todo', isUserAuth, postTodoItem);
todosRouter.delete('/delete_todo/:todoId', isUserAuth, deleteTodoItem);
todosRouter.put('/edit_todo/:todoId', isUserAuth, editTodoItem);


module.exports = todosRouter;

