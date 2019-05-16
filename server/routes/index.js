module.exports = function(app, Todo)
{
    // GET ALL TODOS
    app.get('/api/todos', function(req,res){
        Todo.find(function(err, todos){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(todos);
        })
    });

    // GET SINGLE TODO
    app.get('/api/todos/:todo_id', function(req, res){
        Todo.findOne({_id: req.params.book_id}, function(err, todo){
            if(err) return res.status(500).json({error: err});
            if(!todo) return res.status(404).json({error: 'todo not found'});
            res.json(todo);
        })
    });

    // CREATE TODO
    app.post('/api/todos', function(req, res){
        var todo = new Todo();
        console.log(req.body)
        todo.title = req.body.title;
        todo.content = req.body.content;
        if (req.body.deadline !== null)
            todo.deadline = new Date(req.body.deadline);
        todo.checked = req.body.checked;
        todo.priority = req.body.priority;

        todo.save(function(err, todo){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1, todo: todo});

        });
    });

    // UPDATE THE TODO
    app.put('/api/todos/:todo_id', function(req, res){
        if (req.body.deadline === undefined) {
            Todo.update({ _id: req.params.todo_id }, { $unset: {deadline: ""}}, function(err, output){console.log(output)})
        }
        Todo.update({ _id: req.params.todo_id }, { $set: req.body }, function(err, output)
        {
            if(err) res.status(500).json({ error: 'database failure' });
            if(!output.n) return res.status(404).json({ error: 'todo not found' });
            res.json( { message: 'todo updated' } );
        })
    });

    // DELETE TODO
    app.delete('/api/todos/:todo_id', function(req, res){
        Todo.remove({ _id: req.params.todo_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            res.status(204).end();
            // res.json({result: 1});
        })
    });
     
}
