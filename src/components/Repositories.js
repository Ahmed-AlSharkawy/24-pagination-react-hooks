import React, { useEffect, useRef, useState } from 'react'
import { useMyContext } from '../Context'
import { useFetchRepositories } from '../fetch/useFetchRepositories'
import Pages from './Pages'
import Repository from './Repository'

const Repositories = () => {
  const { login } = useMyContext()
  const { loading, repositories, error } = useFetchRepositories(login)
  const [pageNumber, setPageNumber] = useState(0)
  const [repositoriesPage, setRepositoriesPage] = useState([])
  const [currentSetArray, setCurrentSetArray] = useState([])
  const currentSet = useRef(0)

  useEffect(() => {
    setPageNumber(0)
  }, [repositories])

  useEffect(() => {
    if (!loading) setRepositoriesPage(repositories[pageNumber])
  }, [repositories, loading, pageNumber])

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
          <a
            href={repositories.documentation_url}
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
          dataPage={repositoriesPage}
          data={repositories}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          currentSetArray={currentSetArray}
          setCurrentSetArray={setCurrentSetArray}
          currentSet={currentSet}
        />
      )}
      <section className='followers'>
        <div className='container'>
          {repositoriesPage.map((repo) => {
            return <Repository key={repo.id} {...repo} />
          })}
        </div>
      </section>
      {loading || (
        <Pages
          dataPage={repositoriesPage}
          data={repositories}
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

export default Repositories
