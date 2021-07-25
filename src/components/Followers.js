import React, { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../Context'
import { useFetchFollowers } from '../fetch/useFetchFollowers'
import Pages from './Pages'
import User from './User'

const Followers = () => {
  const { login } = useMyContext()
  const { loading, followers, error } = useFetchFollowers(login)
  const [pageNumber, setPageNumber] = useState(0)
  const [followersPage, setFollowersPage] = useState([])
  const [currentSetArray, setCurrentSetArray] = useState([])
  const currentSet = useRef(0)

  useEffect(() => {
    setPageNumber(0)
  }, [followers])

  useEffect(() => {
    if (!loading) setFollowersPage(followers[pageNumber])
  }, [followers, loading, pageNumber])

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
          <a
            href={followers.documentation_url}
            target='_blank'
            rel='noreferrer'
          >
            documentation url
          </a>
        </h3>
      </div>
    )
  }

  return (
    <main>
      {loading || (
        <Pages
          dataPage={followersPage}
          data={followers}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          currentSetArray={currentSetArray}
          setCurrentSetArray={setCurrentSetArray}
          currentSet={currentSet}
        />
      )}
      <section className='followers'>
        <div className='container'>
          {followersPage.map((follower) => {
            return <User key={follower.id} {...follower} />
          })}
        </div>
      </section>
      {loading || (
        <Pages
          dataPage={followersPage}
          data={followers}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          currentSetArray={currentSetArray}
          setCurrentSetArray={setCurrentSetArray}
          currentSet={currentSet}
        />
      )}
    </main>
  )
}

export default Followers
