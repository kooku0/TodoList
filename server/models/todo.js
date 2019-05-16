var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    title: String,
    content: String,
    deadline: Date,
    checked: Boolean,
    priority: Number
});

module.exports = mongoose.model('todo', todoSchema);
