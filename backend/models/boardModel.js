import mongoose from 'mongoose'
const {schema} = mongoose;

const boardSchema = new schema({
    boardTitile:{
        type:String,
        required:[true,"Board title is required"]
    },
    boardDescription:{
        type:String,
        required:[true,"Board description is required"]
    },
    createdBy:{
        type:mongoose.schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    collaborators:[{
        type:mongoose.schema.Types.ObjectId,
        role:{
            type:String,
            enum:['OWNER', 'EDITOR', 'VIEWER']
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

// middleware to update "updatedAt"
boardSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

const Board = mongoose.model('Board',boardSchema);

export default Board;