import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ThreadDetailsPage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!params.id || !user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread._id!.toString()}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10">
        {thread.children.map((thread: any) => (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={user?.id}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default ThreadDetailsPage;
