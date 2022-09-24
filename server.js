const express = require('express')
const app = express();
var users = require('./users')
const PORT = process.env.PORT || 5000;

app.use(express.json())

// GET REQUEST
app.get('/user', (req,res) => {
    res.send(users);
})

// POST REQUEST
app.post('/user', (req,res) => {
    const { name, access } = req.body;
    try {
        if(req.body.name && req.body.access){
            const newUser = { id: new Date().getTime().toString(), name, access }
            users.push(newUser);
            res.send(users)
        }else{
            return res.send('Invalid Details')
        }
        
    } catch (err) {
        res.send(err.message)
    }
    
})

// DELETE REQUEST
app.delete('/user/:id', (req,res) => {
    const id = req.params.id;
    try {
         users = users.filter((e) => {
            return e.id != id;
        })
        res.send(users);
    } catch (err) {
        res.send(err.message)
    }
     
})

// PATCH REQUEST
app.patch('/user/:id', (req,res) => {
    const id = req.params.id;
    const { name, access } = req.body;
    users.map((e) => {
        if(e.id == id){
            if(name){
                e.name = name;
            }
            if(access){
                e.access = access;
            }
            
        }
    })
    res.send(users)
})

app.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`)
})