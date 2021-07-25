import { useState, useEffect, useCallback } from 'react'
import { useMyContext } from '../Context'
import paginate from '../utils'

const mainURL = 'https://api.github.com/users/'
const urlSuffix = '/following?per_page=100'

export const useFetchFollowing = () => {
  const { login } = useMyContext()
  const url = `${mainURL}${login}${urlSuffix}`

  const [loading, setLoading] = useState(true)
  const [following, setFollowing] = useState([])
  const [error, setError] = useState(null)

  const getFollowing = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setFollowing(paginate(data, 10))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    getFollowing()
  }, [getFollowing, url])

  return { loading, following, error }
}
