import { useState, useEffect, useCallback } from 'react'
import { useMyContext } from '../Context'
import paginate from '../utils'

const mainURL = 'https://api.github.com/users/'
const urlSuffix = '?per_page=100&page='

export const useFetchPages = (type) => {
  const { login, page } = useMyContext()
  const basicURL = `${mainURL}${login}/${type}${urlSuffix}`

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([[]])
  const [error, setError] = useState(null)

  const getFollowers = useCallback(async () => {
    const url = `${basicURL}${page}`

    try {
      setLoading(true)
      const response = await fetch(url)
      const pageData = await response.json()
      setData(paginate(pageData, 10))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [basicURL, page])

  useEffect(() => {
    getFollowers()
  }, [getFollowers, basicURL, page])

  return { loading, data, error }
}
