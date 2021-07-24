import React from 'react'
import { useMyContext } from '../Context'
import { useFetchFollowing } from '../fetch/useFetchFollowing'
import User from './User'

const Following = () => {
  const { login } = useMyContext()
  const { following, error } = useFetchFollowing(login)

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
  } else if (following && following.message) {
    return (
      <div
        style={{
          margin: '4rem auto',
          maxWidth: '70%',
          textAlign: 'center',
          color: 'red',
        }}
      >
        <h2>{following.message}</h2>
        <h3>
          documentation url {'\n'}
          <a
            href={following.documentation_url}
            target='_blank'
            rel='noreferrer'
          >
            {following.documentation_url}
          </a>
        </h3>
      </div>
    )
  }

  return (
    <main>
      <section className='followers'>
        <div className='container'>
          {following.map((follow) => {
            return <User key={follow.id} {...follow} />
          })}
        </div>
      </section>
    </main>
  )
}

export default Following
