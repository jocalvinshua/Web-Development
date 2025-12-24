import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Not Started', 'In progress', 'Done'],
        default: 'Not Started'
    },
    dueDate: {
        type: Date,
        required: true
    }
},{timestamps:true})

const Task = mongoose.Model.task || mongoose.model('task', taskSchema);
export default Task