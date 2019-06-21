const {MongoClient,ObjectID} = require("mongodb");
// var obj = new ObjectID;
// console.log(obj);



MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err,client)=>{

    if(err){
        return console.log("Unable to connect to database");
    }
    console.log("Connection with database established");

const db = client.db('TodoApp');

db.collection('Todos').insertOne({
    text:"Something is here",
    completed: false
},(err,result)=>{
    if(err){
     return console.log(`Error in inserting : ${err}`)
    }
    console.log(JSON.stringify(result.ops,undefined,2));

});

db.collection('Users').insertOne({
    name:"Tanmay Sharma",
    age:21,
    location:"Jaipur"
},(err,result)=>{
    if(err){
              return console.log(`Error in inserting : ${err}`)
             }
             console.log(JSON.stringify(result.ops,undefined,2));
    }        
);   




client.close();



});