import React from 'react'

const Contact = (props) => {
  const { name, number } = props
  return (
    <div className="contact">
      <span>{name}</span>
      <span>{number}</span>
      <div className="button-group">
        
      </div>
    </div>
  )
}

const ContactList = () => {
  return (
    <div className="contact-list">
      Contact List
    </div>
  )
}

export default ContactList
