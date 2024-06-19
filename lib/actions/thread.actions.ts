"use server";

import { ICreateThreadParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import Thread from "../database/models/thread.model";

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
    const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

      const totalThreadCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })
      const threads = await threadsQuery.exec()

      const isNext = totalThreadCount > (skipAmount + threads.length)
      return { threads, isNext}
  } catch (error: any) {
    handleError(error.message);
  }
};
