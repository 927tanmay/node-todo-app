var {mongoose} = require('../db/mongoose');


var User = mongoose.model('User',{
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    }
});

module.exports={
    User
}


// var newUser= new user({
//     email:"927tanmay@gmail.com"
// })

// newUser.save().then((res)=>{
//     console.log(JSON.stringify(res,undefined,2));
// },(err)=>{
//     console.log(err);
// })
