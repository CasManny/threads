import { ICreateThreadParams } from "@/types";
import mongoose from "mongoose";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { Thread } from "../database/models/thread.model";

export const createThread = async ({text, author, communityId, path}: ICreateThreadParams) => {
    try {
        await connectToDatabase()
        const createdThread = await Thread.create({ text, author, community: null })
        
    } catch (error) {
        handleError(error)
    }
}