import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId: {
         type: mongoose.Schema.Types.ObjectId, required: true 
    },
    receiverId: {
         type: mongoose.Schema.Types.ObjectId, required: true 
    },
    messageContent: {
         type: String, required: true 
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const chatSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userType: { type: String, enum: ['user', 'worker'], required: true },
    messages: [messageSchema]
});

export const Chat = mongoose.model('Chat', chatSchema);
