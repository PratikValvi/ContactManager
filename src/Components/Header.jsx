import React from 'react'
import history from '../history'

const Header = () => {
  return (
    <div className="header">
      <span onClick={() => history.push('/')}>Contact Manager</span>
    </div>
  )
}

export default Header
