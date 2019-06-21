const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
    if(err){
        return console.log(`Connection failed ${err}`);
    }
    console.log("Connection established");

    const db =client.db("TodoApp");

    // db.collection("Todos").deleteMany({text:"Eat lunch"}).then((result)=>{
    //     console.log(result)
    // })

    // db.collection("Todos").deleteOne({text:"new record"}).then((result)=>{
    //     console.log(result)
    // })


    // db.collection("Todos").findOneAndDelete({text:"new record"}).then((result)=>{
    //     console.log(result);
    // })

    // db.collection("Users").deleteMany({name:"Tanmay"}).then((result)=>{
    //     console.log(result);
    // })

    db.collection("Users").findOneAndDelete({_id : new ObjectID('5d0d124b088ebb073ea212ea')}).then((result)=>{
        console.log(result);
    })

});