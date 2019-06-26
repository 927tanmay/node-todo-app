var {mongoose} = require('../db/mongoose');

var Todo = mongoose.model('Todo',{

    text:{
        type:String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
});

module.exports={
    Todo
}

// var newTodo = new Todo({
//     text:'Cook Dinner'
// });



// newTodo.save().then((doc)=>{
//     console.log("Saved :",doc);
// },(err)=>{
//     console.log("Error :",err);
// })

