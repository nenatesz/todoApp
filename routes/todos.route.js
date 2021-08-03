const express = require('express');
const {getAllTodos, postTodoItem, deleteTodoItem, editTodoItem} = require("../functions/todos.function")


const todosRouter = express.Router();

todosRouter.get('/get_todo', getAllTodos);
todosRouter.post('/post_todo', postTodoItem);
todosRouter.delete('/delete_todo/:todoId', deleteTodoItem);
todosRouter.put('/edit_todo/:todoId', editTodoItem);


module.exports = todosRouter;

