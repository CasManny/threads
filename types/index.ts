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
