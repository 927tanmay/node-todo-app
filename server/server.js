var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');
const _ = require('lodash');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const port = process.env.PORT||3000;

var app = express();

app.use(bodyParser.json());


app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })


})


app.get('/todos',(req,res)=>{
    Todo.find({}).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});



app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    
    if(!ObjectId.isValid(id)){
        res.status(404).send();
    }else{
        Todo.findById(id).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send(todo);
        }).catch((e)=>{
            res.status(404).send(e);
        })
    }

})

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if(!ObjectId.isValid(id)){
        res.status(404).send();
    }else{
        Todo.findByIdAndDelete(id).then((todo)=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send({todo});
        }).catch((e)=>res.status(404).send());
    }


})



app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if(!ObjectId.isValid(id)){
        res.status(404).send();
    }

    var body = _.pick(req.body,['text','completed']);

    if(_.isBoolean(body.completed) && body.completed){
       body.completedAt = new Date().getTime();
    }else{
    body.completed=false;
    body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id,{$set : body},{new : true}).then((todo)=>{
        if(!todo){
           return res.status(404).send();
        }

        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send()
    })


})


app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})

module.exports = {
    app
}








