import { SortOrder } from "mongoose";

export interface IAccountProps {
  user: {
    id?: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

export interface IUpdateUserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export interface ICreateThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export interface IThreadCardParams {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    _id: string;
    id: string;
    __v: number;
    bio: string;
    communities: string[];
    image: string;
    onboarded: boolean;
    threads: string[];
    username: string;
    name: string;
  };
  community: { id: string; name: string; image: string } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

export interface ICommentParams {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

export interface ICommentAddToThreadParams {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
}

export interface IProfileParams {
  accountId: string;
  authUser: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
}

export interface IThreadsTabParams {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

export interface IUserSearchParams {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy: SortOrder;
}

export interface IUserSearchResultParams {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}
