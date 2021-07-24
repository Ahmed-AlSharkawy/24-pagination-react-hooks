import React, { useState } from 'react'

const Repository = (repo) => {
  const [showURL, setShowURL] = useState(false)
  const [url, setUrl] = useState(null)

  const {
    name,
    html_url,
    git_url,
    ssh_url,
    clone_url,
    description,
    language,
    default_branch,
  } = repo

  return (
    <article className='card repo-card' style={{ padding: '1rem 1.5rem' }}>
      <div className='infos'>
        <h4>
          <span>name : </span>
          {name}
        </h4>
        <a
          className='btn'
          style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            marginBottom: '0.5rem',
          }}
          href={html_url}
          target='_blank'
          rel='noopener noreferrer'
        >
          visit repository
        </a>

        {description && (
          <h4>
            <span>description : </span>
            {description}
          </h4>
        )}

        {language && (
          <h4>
            <span>languages : </span>
            {language}
          </h4>
        )}

        {default_branch && (
          <h4>
            <span>default branch : </span>
            {default_branch}
          </h4>
        )}
      </div>
      <div className='clone'>
        <button
          className='btn'
          onClick={() => {
            if (!showURL) {
              setUrl(clone_url)
              setShowURL(true)
            }
          }}
        >
          clone
        </button>
        {showURL && (
          <>
            <div
              style={{ display: 'block', margin: '0.6rem auto 0.3rem auto' }}
            >
              <label
                className='label'
                htmlFor='cloneURL'
                onClick={() => setUrl(clone_url)}
              >
                HTTPS
              </label>
              <label
                className='label'
                htmlFor='cloneURL'
                onClick={() => setUrl(ssh_url)}
              >
                SSH
              </label>
              <label
                className='label'
                htmlFor='cloneURL'
                onClick={() => setUrl(git_url)}
              >
                GIT
              </label>
            </div>
            <textarea
              rows='3'
              name='cloneURL'
              id='cloneURL'
              value={url}
              style={{ width: '100%', padding: '0.4rem' }}
            />
          </>
        )}
      </div>
    </article>
  )
}

export default Repository
