import React, { useEffect, useState } from 'react'
import UserDetails from './UserDetails'

const User = ({ login, avatar_url, html_url }) => {
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user) setShowModal(true)
  }, [user])

  const getUser = async () => {
    const url = `https://api.github.com/users/${login}`

    const response = await fetch(url)
    const userData = await response.json()
    setUser(userData)
  }

  return (
    <article className='card'>
      {showModal && (
        <UserDetails onClose={() => setShowModal(false)} user={user} />
      )}
      <h4>
        <a href={html_url} target='_blank' rel='noopener noreferrer'>
          <img src={avatar_url} alt={login} />
        </a>
      </h4>
      <h4 style={{ margin: '0 auto' }}>
        <a
          className='btn'
          href={html_url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {login}
        </a>
      </h4>

      <button
        className='btn'
        style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
        onClick={() => {
          getUser()
        }}
      >
        details
      </button>
      <a
        href={`https://githubusers-fusioncharts-auth0-react.netlify.app/${login}`}
        target='_blank'
        rel='noopener noreferrer'
        className='btn'
      >
        advanced app
      </a>
    </article>
  )
}

export default User
