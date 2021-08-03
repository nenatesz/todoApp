const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos.route');
const usersRouter = require('./routes/users.route');



const app = express()
const port = 7070


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cors({ origin: true }));



app.use('/api', todosRouter)
app.use('/api', usersRouter)

app.listen(port, (error) => {
    if (error) {
        throw error
    }
    console.log(`server started at http://localhost:${port}`)
})