import { useState, useEffect, useCallback } from 'react'
import { useMyContext } from '../Context'
import paginate from '../utils'

const mainURL = 'https://api.github.com/users/'
const urlSuffix = '/followers?per_page=100&page='

export const useFetchFollowers = () => {
  const { login } = useMyContext()
  const basicURL = `${mainURL}${login}${urlSuffix}`

  const [loading, setLoading] = useState(true)
  const [followers, setFollowers] = useState([[]])
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  const getFollowers = useCallback(async () => {
    const url = `${basicURL}${page}`

    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setFollowers(paginate(data, 10))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [basicURL, page])

  useEffect(() => {
    getFollowers()
  }, [getFollowers, basicURL, page])

  return { loading, followers, error, page, setPage }
}
