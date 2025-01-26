import mongoose from 'mongoose'

const {schema} = mongoose

const drawingSchema = new schema({
    boardId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Board',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    elements:[{
        type:String,
        coordinates:Object,
        color:String,
        strokeWidth:Number
    },],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

const Drawing = mongoose.model('Drawing', drawingSchema);

export default Drawing;