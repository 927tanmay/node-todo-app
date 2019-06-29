var {Todo} = require('../server/models/todo');
var {ObjectId} = require('mongodb');
var {mongoose} = require('../server/db/mongoose');

Todo.findByIdAndRemove('5d16420d85521f791620454b').then((todo)=>{
    console.log(todo);
})

Todo.findOneAndRemove({text:"Test todo 2"}).then((todo)=>{
    console.log(todo);
})

Todo.remove({}).then((doc)=>{
    console.log(doc);
})

