import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  return (
    <section className="">
      <ProfileHeader
        accountId={userInfo.id}
        authUser={user?.id!}
        name={userInfo.name}
        username={userInfo.username}
        avatar={userInfo.image}
        bio={userInfo.bio}
          />
          
          <div className="mt-9">
              
          </div>
    </section>
  );
};

export default ProfilePage;
