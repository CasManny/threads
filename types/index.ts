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
  author: { name: string; image: string; id: string };
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
