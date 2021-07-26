import { useState, useEffect, useCallback } from 'react'
import { useMyContext } from '../Context'

const mainURL = 'https://api.github.com/users/'

export const useFetchUser = () => {
  const { login } = useMyContext()
  const url = `${mainURL}${login}`

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState([])
  const [error, setError] = useState(null)

  const getUser = useCallback(async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    getUser()
  }, [getUser, url])

  return { loading, user, error }
}
