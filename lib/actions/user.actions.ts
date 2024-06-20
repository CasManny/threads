"use server";

import { IUpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import Thread from "../database/models/thread.model";

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
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return threads
  } catch (error: any) {
    handleError(error.message);
  }
};
