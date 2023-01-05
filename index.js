const express = require('express');
app = express();
let {pool: pool} = require('./db');

app.use(express.json());


// Post data
app.post("/todos", async (req, res) => {
    try{
        const {desc} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [desc])

        return res.json(newTodo.rows[0]);
    }catch(e){
        console.log(e.message)
    }
})


//Read all data
app.get("/todos", async (req, res) => {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows)
})



//Read a specific item
app.get("/todos/:id", async (req, res) => {
    
    const {id} = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [id])
    res.json(todo)
})



//updated
app.put("/todos/:id", async (req, res) => {
    try{
        const {id} = req.params
        const {description} = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])

        res.json({message:"todo was updated", updateTodo})
    }catch(e){
        console.log(e.message)
    }
})



//delete 
app.delete("/todos/:id", async (req, res) =>{
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])

    res.json({message:"todo was deleted"})
})



app.listen(5000, ()=>{
    console.log('listening on port', 5000);
})