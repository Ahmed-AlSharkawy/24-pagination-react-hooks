import React from 'react'
import { useMyContext } from '../Context'
import { useFetchFollowers } from '../fetch/useFetchFollowers'
import User from './User'

const Followers = () => {
  const { login } = useMyContext()
  const { followers, error } = useFetchFollowers(login)

  if (error) {
    return (
      <h2
        style={{
          margin: '4rem auto',
          maxWidth: '70%',
          textAlign: 'center',
          color: 'red',
        }}
      >
        {error.toString()}
      </h2>
    )
  } else if (followers && followers.message) {
    return (
      <div
        style={{
          margin: '4rem auto',
          maxWidth: '70%',
          textAlign: 'center',
          color: 'red',
        }}
      >
        <h2>{followers.message}</h2>
        <h3>
          documentation url {'\n'}
          <a
            href={followers.documentation_url}
            target='_blank'
            rel='noreferrer'
          >
            {followers.documentation_url}
          </a>
        </h3>
      </div>
    )
  }

  return (
    <main>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <User key={follower.id} {...follower} />
          })}
        </div>
      </section>
    </main>
  )
}

export default Followers
