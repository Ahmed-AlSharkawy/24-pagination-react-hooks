import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useMyContext } from './Context'
import { useFetchUser } from './fetch/useFetchUser'
import App from './App'

function AppWrapper() {
  const { login } = useParams()
  const { loading } = useFetchUser()
  const { toggleShows } = useMyContext()

  useEffect(() => toggleShows('followers', login), [login, toggleShows])

  if (loading) return <></>

  return <App />
}

export default AppWrapper
