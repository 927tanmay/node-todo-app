const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{
    if(err){
        return console.log(`Connection failed ${err}`);
    }
    console.log("Connection established");

    const db =client.db("TodoApp");

    // db.collection("Todos").find({_id:new ObjectID('5d0d027b088ebb073ea212e7')    
    // }).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2))
    // }),(err)=>{
    //     console.log(`Unable to fetch ${err}`);
    // }



    // db.collection("Todos").find().count().then((count)=>{
    //     console.log(`No. of todos ${count}`)
    // }),(err)=>{
    //  console.log(`Unable to fetch ${err}`);
    // }

    db.collection("Users").find({name:"Tanmay"}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2))
    }),(err)=>{
        console.log(`Unable to fetch ${err}`);
    }


});