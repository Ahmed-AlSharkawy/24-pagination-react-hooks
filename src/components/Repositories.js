import React from 'react'
import { useMyContext } from '../Context'
import { useFetchRepositories } from '../fetch/useFetchRepositories'
import Repository from './Repository'

const Repositories = () => {
  const { login } = useMyContext()
  const { repositories, error } = useFetchRepositories(login)

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
  } else if (repositories && repositories.message) {
    return (
      <div
        style={{
          margin: '4rem auto',
          maxWidth: '70%',
          textAlign: 'center',
          color: 'red',
        }}
      >
        <h2>{repositories.message}</h2>
        <h3>
          documentation url {'\n'}
          <a
            href={repositories.documentation_url}
            target='_blank'
            rel='noreferrer'
          >
            {repositories.documentation_url}
          </a>
        </h3>
      </div>
    )
  }

  return (
    <main>
      <section className='followers'>
        <div className='container'>
          {repositories.map((repo) => {
            return <Repository key={repo.id} {...repo} />
          })}
        </div>
      </section>
    </main>
  )
}

export default Repositories
