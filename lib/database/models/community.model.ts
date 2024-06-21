import mongoose from 'mongoose'

const communitySchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    bio: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
    members: [{typpe: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

export const Community = mongoose.models.Community || mongoose.model("Community", communitySchema)