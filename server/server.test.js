const request = require('supertest');
const expect = require('expect');

var {Todo} = require('./models/todo');
var {app} = require('./server');

beforeEach((done)=>{
   Todo.deleteMany({}).then(()=>done()); 
});






describe('POST/Todos',()=>{

    var text = "Test todo text";

    it('should create a new todo',(done)=>{
        request(app)
         .post('/todos')
         .send({text})
         .expect(200)
         .expect((res)=>{
             expect(res.body.text).toBe(text);
         })
         .end((err,res)=>{
             if(err){
                 console.log(err);
             }
         
         
    Todo.find().then((doc)=>{
        expect(doc.length).toBe(1);
        expect(doc[0].text).toBe(text);
        done();
    }).catch((e)=>done(e));
});
});

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>done()); 
 });

    it('should not create a todo with invalid body data',(done)=>{
        request(app)
         .post('/todos')
         .send({})
         .expect(400)
         .end((err,res)=>{
             if(err){
                 console.log(err);
             }

             Todo.find().then((doc)=>{
                 expect(doc.length).toBe(0);
                 done();
             }).catch((e)=>done(e));
         });
    });




});