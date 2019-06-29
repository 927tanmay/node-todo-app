const request = require('supertest');
const expect = require('expect');
var {ObjectId} = require('mongodb');


var {Todo} = require('./models/todo');
var {app} = require('./server');


const todos = [{
    _id : new ObjectId(),
    text:"Test todo 1"
},
{   _id: new ObjectId(),
    text:"Test todo 2",
    completed : true,
    completedAt : 123
}];


beforeEach((done)=>{
   Todo.remove({}).then(()=>{
       return Todo.insertMany(todos);
   }).then(()=>done()); 
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
         
         
    Todo.find({text}).then((doc)=>{
        expect(doc.length).toBe(1);
        expect(doc[0].text).toBe(text);
        done();
    }).catch((e)=>done(e));
});
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
                 expect(doc.length).toBe(2);
                 done();
             }).catch((e)=>done(e));
         });
    });
});

describe('Get \todos\:id',()=>{
    it("should return todo doc",(done)=>{
        request(app)
         .get(`/todos/${todos[0]._id.toHexString()}`)
         .expect(200)
         .expect((res)=>{
             expect(res.body.text).toBe(todos[0].text);
         })
         .end(done);
    })

    it("should return 404 if todo not found",(done)=>{
        var tmpid = new ObjectId().toHexString();

        request(app)
         .get(`/todos/tmpid`)
         .expect(404)
         .end(done);
    })

    it("should return 404 for non-object ids",(done)=>{
        request(app)
         .get('/todos/123')
         .expect(404)
         .end(done);
    })
})



describe('delete /todos/:id',()=>{
    it('should remove a todo',(done)=>{
        var testid = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${todos[1]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(todos[1].text)
            })
            .end((err,res)=>{
                if(err){
                    console.log(err);
                }
                
                Todo.findById(testid).then((todo)=>{
                    expect(todo).toBeNull();
                    done();
                }).catch((e)=>done(e))



            });
    })

    it("should return 404 if todo not found",(done)=>{
        var tmpid = new ObjectId().toHexString();

        request(app)
         .delete(`/todos/tmpid`)
         .expect(404)
         .end(done);
    })

    it("should return 404 for non-object ids",(done)=>{
        request(app)
         .delete('/todos/123')
         .expect(404)
         .end(done);
    })

})


describe("Patch /todos/:id",()=>{

    it("should update the todo",(done)=>{
        var id = todos[0]._id.toHexString();
        var text

        request(app)
            .patch(`/todos/${id}`)
            .send({
                completed:true, 
                text: "Updates todo 1"
            })
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe("Updates todo 1");
                expect(res.body.todo.completed).toBe(true);                
                //expect(res.body.completedAt).toBeA('number');
            })
            .end(done);

    })
    it("should clear completedAt when todo is not complete",(done)=>{
        var id = todos[1]._id.toHexString();
        var text

        request(app)
            .patch(`/todos/${id}`)
            .send({
                completed:false 
           
            })
            .expect(200)
            .expect((res)=>{
                //expect(res.body.todo.text).toBe("Updates todo 1");
                expect(res.body.todo.completedAt).toBeNull();                
                expect(res.body.todo.completed).toBe(false);
            })
            .end(done);

    })


})