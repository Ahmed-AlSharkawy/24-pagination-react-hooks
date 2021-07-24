import { useState, useEffect, useCallback } from 'react'
import { useMyContext } from '../Context'
import paginate from '../utils'

const mainURL = 'https://api.github.com/users/'
const urlSuffix = '/followers?per_page=100'

export const useFetchFollowers = () => {
  const { login } = useMyContext()
  const url = `${mainURL}${login}${urlSuffix}`

  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState([])
  const [error, setError] = useState(null)

  const getFollowers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setFollowers(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    getFollowers()
  }, [getFollowers, url])

  return { loading, followers, error }
}
