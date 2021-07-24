import React from 'react'
import { useMyContext } from './Context'

import Followers from './components/Followers'
import Following from './components/Following'
import Repositories from './components/Repositories'
import Header from './components/Header'

function App() {
  const { showFollowers, showFollowing, showRepos } = useMyContext()

  const setType = () => {
    if (showFollowers) return 'followers'
    if (showFollowing) return 'following'
    if (showRepos) return 'repositories'
  }
  return (
    <>
      <Header type={setType()} />
      {showFollowers && <Followers />}
      {showFollowing && <Following />}
      {showRepos && <Repositories />}
    </>
  )
}

export default App
