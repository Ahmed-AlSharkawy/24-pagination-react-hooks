import React, { useState } from 'react'
import { useFetchUser } from '../fetch/useFetchUser'
import UserDetails from './UserDetails'

const Header = ({ type }) => {
  const { loading, user, error } = useFetchUser()
  const [showModal, setShowModal] = useState(false)

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
  } else if (user && user.message) {
    return (
      <div
        style={{
          margin: '4rem auto',
          maxWidth: '70%',
          textAlign: 'center',
          color: 'red',
        }}
      >
        <h2>{user.message}</h2>
        <h3>
          <a href={user.documentation_url} target='_blank' rel='noreferrer'>
            documentation url
          </a>
        </h3>
      </div>
    )
  }

  return (
    <header>
      {showModal && (
        <UserDetails onClose={() => setShowModal(false)} user={user} />
      )}
      <div className='section-title'>
        <h1>{loading ? 'loading ...' : `${user.name} ${type}`}</h1>
        {loading || (
          <button
            className='btn'
            style={{ marginTop: '1rem', padding: '0.5rem 1.5rem' }}
            onClick={() => setShowModal(true)}
          >
            details
          </button>
        )}

        <div className='underline'></div>
      </div>
    </header>
  )
}

export default Header
