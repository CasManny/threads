import { fetchUser, getActivity } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const ActivityPage = async () => {
  const user = await currentUser()
  const userInfo = await fetchUser(user?.id!)
  if (!user || !userInfo?.onboarded) {
    redirect("/sign-in")
  }

  const activity = await getActivity(userInfo._id)
  return (
      <section>
      <h1 className="mb-10 head-text">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity?.length === 0 ? (
        <p className='!text-base-regular text-light-3'>No activity yet</p>
        ) : (
            <>
              {activity?.map((activity) => (
                <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                  <article className="activity-card">
                    <Image src={activity.author.image} alt='profile picture' width={20} height={20} className='rounded-full object-cover' />
                    <p className='!text-small-regular text-light-1'>
                      <span className='mr-1 text-primary-500'>{activity.author.name}</span>{" "}
                      replied to your thread
                    </p>
                  </article>
              </Link>
            ))}
            </>
        )}
      </section>
    </section>
  )
}

export default ActivityPage