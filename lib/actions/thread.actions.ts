import { ICreateThreadParams } from "@/types";
import mongoose from "mongoose";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { Thread } from "../database/models/thread.model";
import { User } from "../database/models/user.model";
import { revalidatePath } from "next/cache";

export const createThread = async ({text, author, communityId, path}: ICreateThreadParams) => {
    try {
        await connectToDatabase()
        const createdThread = await Thread.create({ text, author, community: null })
        // update the threads array of the user that created the thread
        const updateUserThread = await User.findOneAndUpdate({ author }, {
            $push: {threads: createdThread._id}
        })
        // enable the change happen immediately on our website
        revalidatePath(path)
        
    } catch (error) {
        handleError(error)
    }
}