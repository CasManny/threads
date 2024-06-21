import UserCard from "@/components/cards/UserCard"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const SearchThreadPage = async () => {
  const user = await currentUser()
  const userInfo = await fetchUser(user?.id!)
  if (!user || !userInfo.onboarded) {
    redirect('/sign-in')
  }

  const result = await fetchUsers({ userId: userInfo.id, searchString: "", pageNumber: 1, pageSize: 25, sortBy: "desc"})
  return (
    <section>
      <div className="mt-14 flex flex-col gap-9">
        {result?.users.length === 0 ? (
        <p className="no-result">No User</p>
        ) : (
            <>
              {result?.users.map((person) => (
                <UserCard key={person.id} id={person.id} name={person.name} username={person.username} imgUrl={person.image} personType="User" />
              ))}
            </>
        )}
      </div>
    </section>
  )
}

export default SearchThreadPage