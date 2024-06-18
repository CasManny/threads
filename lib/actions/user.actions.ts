"use server";

import { IUpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import { User } from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const updateUser = async ({
  bio,
  path,
  username,
  userId,
  image,
}: IUpdateUserParams) => {
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), bio, path, image, onboarded: true },
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
    await connectToDatabase()
   return await User.findOne({id: userId})
  } catch (error) {
    handleError(error)
  }
}
