"use server";

import { ICommentAddToThreadParams, ICreateThreadParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import Thread from "../database/models/thread.model";
import exp from "constants";

export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: ICreateThreadParams) => {
  try {
    await connectToDatabase();
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });
    // update the threads array of the user that created the thread
    const updateUserThread = await User.findOneAndUpdate(
      { _id: author },
      {
        $push: { threads: createdThread._id },
      }
    );
    // enable the change happen immediately on our website
    revalidatePath(path);
  } catch (error: any) {
    handleError(error.message);
  }
};

export const fetchThreads = async (pageNumber = 1, pageSize = 20) => {
  try {
    await connectToDatabase();
    const skipAmount = Number(pageNumber - 1) * pageSize;

    const threads = await Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author" })
      .populate({
        path: "children",
        populate: { path: "author", select: "_id name parentId image" },
      });

    const totalThreadCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const isNext = totalThreadCount > skipAmount + threads.length;

    return { threads, isNext };
  } catch (error: any) {
    handleError(error.message);
  }
};

export const fetchThreadById = async (threadId: string) => {
  try {
    await connectToDatabase();
    // TODO: Populate community
    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            select: "name _id id parentId image",
          },
          {
            path: "children",
            populate: {
              path: "author",
              select: "_id id name parentId image"
            }
          },
        ],
      });
    
    return thread
  } catch (error: any) {
    handleError(error.message);
  }
};

export const addCommentToThread = async ({threadId, commentText, userId, path}:ICommentAddToThreadParams) => {
  try {
    await connectToDatabase()
    // Find the original thread by its Id
    const originalThread = await Thread.findById(threadId)
    if (!originalThread) {
      throw new Error("Thread not")
    }
    // Create a new thread with the comment text
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId
    })
    // save the new comment thread to database
    const savedCommentThread = await commentThread.save()
    // update the orginal thread to include the new comment
    originalThread.children.push(savedCommentThread._id)
    // save the orginal thread
    await originalThread.save();
    revalidatePath(path)
  } catch (error: any) {
    handleError(error.message)
  }

}
