var {Todo} = require('../server/models/todo');
var {mongoose} = require('../server/db/mongoose');
var {User} = require('../server/models/user');
const {ObjectId} = require('mongodb');

var id = "d15e8670f49f1cfa8f3cb00";
if(!ObjectId.isValid(id)){
    console.log('Id is not valid');
}



Todo.find({
    _id : id
}).then((todos)=>{
    console.log('Todos ',todos);
});

Todo.findOne({
    _id:id
}).then((todo)=>{
    console.log('Todo',todo);
})

Todo.findById(id).then((todo)=>{
    console.log('Todo By Id',todo);
}).catch((e)=>console.log(e))


// var id = "5d13bf7c35999a387cdb484a";

// User.findById({
//     _id:id
// }).then((todo)=>{
//     console.log("user_Todo",todo)
// });