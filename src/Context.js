import React, { useContext, useState } from 'react'

export const Context = React.createContext()

export default function Provider({ children }) {
  const [showFollowers, setShowFollowers] = useState(true)
  const [showFollowing, setShowFollowing] = useState(false)
  const [showRepos, setShowRepos] = useState(false)
  const [login, setLogin] = useState('john-smilga')
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(62)

  const toggleShows = (whatToShow, userLogin = 'john-smilga') => {
    if (whatToShow === 'followers') {
      setShowFollowers(true)
      setShowFollowing(false)
      setShowRepos(false)
    } else if (whatToShow === 'following') {
      setShowFollowers(false)
      setShowFollowing(true)
      setShowRepos(false)
    } else if (whatToShow === 'repos') {
      setShowFollowers(false)
      setShowFollowing(false)
      setShowRepos(true)
    }
    setLogin(userLogin)
  }

  return (
    <Context.Provider
      value={{
        showFollowers,
        showFollowing,
        showRepos,
        login,
        toggleShows,
        page,
        setPage,
        pageCount,
        setPageCount,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useMyContext = () => useContext(Context)
