import mongoose from 'mongoose'

const boardContentSchema = new mongoose.Schema({
    boardId: mongoose.Schema.Types.ObjectId,
    boardElements: [mongoose.Schema.Types.Mixed]
})

export const BoardContent =  mongoose.model("BoardContent", boardContentSchema);