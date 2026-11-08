const mongoose = require('mongoose');
const {Schema} = mongoose;

let todoSchema = new Schema({
    user_task :{
        type : String,
        required : true,
    },
    user_priority :{
        type : String,
        enum : ['none','high','meduim','low'],
        default : 'none'
    }
});

module.exports = mongoose.model('page',todoSchema);