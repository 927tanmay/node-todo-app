const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
    if(err){
        return console.log(`Connection failed ${err}`);
    }
    console.log("Connection established");

    const db =client.db("TodoApp");

//   db.collection('Todos').findOneAndUpdate({
//       _id: new ObjectID('5d0ce4d50dc7967ef816397b')
//   },{
//       $set:{
//           completed:true
//       }
//   },{
//       returnOriginal:false
//   }).then((result)=>{
//     console.log(result);
//   })

db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5d0d58ca088ebb073ea212ee')
},{
    $set:{
        name:"Chinmay"
    },
    $inc:{
        age:1
    }



},{
    returnOriginal:false
}).then((result)=>{
  console.log(result);
})


});