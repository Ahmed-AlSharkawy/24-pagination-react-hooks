import React from 'react'
import { useMyContext } from '../Context'

const UserDetails = (props) => {
  const { toggleShows } = useMyContext()

  const {
    login,
    name,
    avatar_url,
    html_url,
    location,
    public_repos,
    followers,
    following,
  } = props.user

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <span className='close' onClick={props.onClose}>
            &times;
          </span>
        </div>
        <article className='card modal-body'>
          <a href={html_url} target='_blank' rel='noopener noreferrer'>
            <img src={avatar_url} alt={name} />
          </a>

          <h4
            style={{ margin: '1rem auto 0.5rem auto' }}
          >{`name : ${name}  `}</h4>
          <a
            className='btn'
            style={{ fontSize: '0.6rem' }}
            href={html_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            show profile
          </a>

          <h4 style={{ margin: '1rem auto 0.5rem auto' }}>
            location : {location}
          </h4>

          <h4
            style={{ margin: '1rem auto 0.5rem auto' }}
          >{`Repositories : ${public_repos}  `}</h4>
          {public_repos > 0 && (
            <button
              className='btn'
              style={{ fontSize: '0.6rem' }}
              onClick={() => {
                props.onClose()
                toggleShows('repos', login)
              }}
            >
              show repositories
            </button>
          )}
          <h4
            style={{ margin: '1rem auto 0.5rem auto' }}
          >{`followers : ${followers}  `}</h4>
          {followers > 0 && (
            <button
              className='btn'
              style={{ fontSize: '0.6rem' }}
              onClick={() => {
                props.onClose()
                toggleShows('followers', login)
              }}
            >
              show followers
            </button>
          )}
          <h4
            style={{ margin: '1rem auto 0.5rem auto' }}
          >{`following : ${following}  `}</h4>
          {following > 0 && (
            <button
              className='btn'
              style={{ fontSize: '0.6rem' }}
              onClick={() => {
                props.onClose()
                toggleShows('following', login)
              }}
            >
              show following
            </button>
          )}
        </article>
      </div>
    </div>
  )
}

export default UserDetails
