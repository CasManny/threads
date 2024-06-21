"use server";

import { IUpdateUserParams, IUserSearchParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Thread from "../database/models/thread.model";
import { queryObjects } from "v8";
import { FilterQuery } from "mongoose";
import { User } from "../database/models/user.model";

export const updateUser = async ({
  bio,
  path,
  username,
  userId,
  image,
  name,
}: IUpdateUserParams) => {
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        bio,
        path,
        image,
        onboarded: true,
        name,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    handleError(error);
  }
};

export const fetchUser = async (userId: string) => {
  try {
    await connectToDatabase();
    return await User.findOne({ id: userId });
  } catch (error) {
    handleError(error);
  }
};

export const fetchUserThreads = async (userId: string) => {
  try {
    await connectToDatabase();

    // Find all threads authored by user with the given userId
    // TODO: populate the community path as well
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      populate: {
        path: "children",
        populate: {
          path: "author",
          select: "name image id",
        },
      },
    });

    return threads
  } catch (error: any) {
    handleError(error.message);
  }
};


export const fetchUsers = async ({userId, searchString ="", pageSize=20, pageNumber=0, sortBy}: IUserSearchParams) => {
  try {
    await connectToDatabase()
    const skipAmount = Number(pageNumber - 1) * pageSize
    const regex = new RegExp(searchString, "i")

    const query: FilterQuery<typeof User> = { id: { $ne: userId } }
    if (searchString.trim() !== "") {
      query.$or = [{username: {$regex: regex}}, {name: {$regex: regex}}]
    }
    const sortOptions = { createdAt: sortBy }
    
    const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize)
    const totalUserCount = await User.countDocuments(query)

    const users = await usersQuery.exec()
    const isNext = totalUserCount > (skipAmount + users.length)
    return {users, isNext}
  } catch (error: any) {
    handleError(error.message)
  }
}

export const getActivity = async (userId: string) => {
  try {
    await connectToDatabase()
    const userThreads = await Thread.find({ author: userId });
    // collect all the thread ids (replies) from the children field
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children)
    }, [])
    const replies = await Thread.find({ _id: { $in: childThreadIds }, author: { $ne: userId } }).populate({
      path: "author",
      select: "name image _id"
    })

    return replies
  } catch (error: any) {
    handleError(error.message)
  }
} 
