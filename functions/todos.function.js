const {db} = require('../utils/firebase')

const getAllTodos = (req,res)=> {
    db.collection('todos').orderBy('createdAt', 'desc').get().then(data=>{
        let todos = [];
        data.forEach(doc=>{
            todos.push({
                todoId: doc.id,
                title: doc.data().title,
                body: doc.data().body,
                createdAt: doc.data().createdAt,
            })
        })
        return res.json(todos)
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({error: err.code})
    })

};


const postTodoItem = (req, res) => {
    if(req.body.body.trim() === ""){
        return res.status(400).json({body: "Must not be empty"})
    };
    if(req.body.title.trim() === ""){
        return res.status(400).json({title: "Must not be empty"})
    };
    const newTodoItem = {
        title: req.body.title,
        body: req.body.body,
        createdAt: new Date().toISOString()
        
    };
    const collection = db.collection('todos');

    collection.add(newTodoItem).then(doc=>{
        const resTodoItem = newTodoItem;
        resTodoItem.id = doc.id;
        collection.doc(resTodoItem.id).set({item_id: resTodoItem.id}, {merge: true})
        return res.json(resTodoItem)

    }).catch(err=>{
        console.log(err);
        return res.status(500).json({error: 'Something went wrong'})
    })

};

const deleteTodoItem = (req, res) => {
    const document = db.collection('todos').doc(req.params.todoId);
    document.get().then(doc=>{
        if(!doc.exists){
            return res.status(400).json({error: 'Todo Item not found'})
        }
        return document.delete()

    }).then(()=>{
        res.json({message: "Delete Successful"})
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({error: 'Something went wrong'})
    })
}

const editTodoItem = (req, res) => {
    if(req.body.item_id || req.body.createdAt){
        return res.status(403).json({message: "Not allowed to edit id and createdAt"})
    }

    let document = db.collection('todos').doc(req.params.todoId)
    
    document.update(req.body).then(()=>{
        res.json({message: "Update Successful"})
    }).catch(err=>{
        console.log(err);
        return res.status(500).json({error: 'Todo item does not exist'})
    })
}


module.exports = {getAllTodos, postTodoItem, deleteTodoItem, editTodoItem}