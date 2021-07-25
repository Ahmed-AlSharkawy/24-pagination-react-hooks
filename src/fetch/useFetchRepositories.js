import { useState, useEffect, useCallback } from 'react'
import { useMyContext } from '../Context'
import paginate from '../utils'

const mainURL = 'https://api.github.com/users/'
const urlSuffix = '/repos?per_page=100'

export const useFetchRepositories = () => {
  const { login } = useMyContext()
  const url = `${mainURL}${login}${urlSuffix}`

  const [loading, setLoading] = useState(true)
  const [repositories, setRepositories] = useState([])
  const [error, setError] = useState(null)

  const getRepositories = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setRepositories(paginate(data, 10))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    getRepositories()
  }, [getRepositories, url])

  return { loading, repositories, error }
}
