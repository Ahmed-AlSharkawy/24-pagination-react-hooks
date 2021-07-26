import React, { useEffect, useRef, useState } from 'react'
import { useFetchPages } from '../fetch/useFetchPages'
import Pages from './Pages'
import User from './User'

const Following = () => {
  const { loading, data: following, error } = useFetchPages('following')
  const [pageNumber, setPageNumber] = useState(0)
  const [followingPage, setFollowingPage] = useState([])
  const [currentSetArray, setCurrentSetArray] = useState([])
  const currentSet = useRef(0)
  useEffect(() => {
    setPageNumber(0)
  }, [following])

  useEffect(() => {
    if (!loading) setFollowingPage(following[pageNumber])
  }, [following, loading, pageNumber])

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
          <a
            href={following.documentation_url}
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
          dataPage={followingPage}
          data={following}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          currentSetArray={currentSetArray}
          setCurrentSetArray={setCurrentSetArray}
          currentSet={currentSet}
        />
      )}
      <section className='followers'>
        <div className='container'>
          {followingPage.map((follow) => {
            return <User key={follow.id} {...follow} />
          })}
        </div>
      </section>
      {loading || (
        <Pages
          dataPage={followingPage}
          data={following}
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

export default Following
