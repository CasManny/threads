import ThreadCard from "@/components/cards/ThreadCard";
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
    
    const thread = await fetchThreadById(id)

  return (
    <section className="relative">
      <div>
        <ThreadCard />
      </div>
    </section>
  );
};

export default ThreadDetailsPage;
