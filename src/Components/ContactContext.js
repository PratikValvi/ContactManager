import React, { createContext, useState } from 'react';

export const ContactContext = createContext();

export const ContactProvider = (props) => {
  const [contactDetails, setContactDetails] = useState({})

  return (
    <ContactContext.Provider value={[contactDetails, setContactDetails]}>
      {props.children}
    </ContactContext.Provider>
  )
}
