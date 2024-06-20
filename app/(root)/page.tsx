import { fetchThreads } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import ThreadCard from "@/components/cards/ThreadCard";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in')
  }
  const results: any = await fetchThreads(1, 30);


  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
 
      <section className="mt-9 flex flex-col gap-10">
        {results?.threads.length === 0 ? (
          <p className="no-result">No thread Found</p>
        ) : (
          <>
            {results?.threads.map((thread: any) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
