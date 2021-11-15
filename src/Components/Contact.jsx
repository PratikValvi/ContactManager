import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Input, Stack, Button, Container, Center } from "@chakra-ui/react";
import { initialErrorMessages, errorReducer } from './errorReducer';
import { handleAddContact, handleUpdateContact } from '../Actions/axiosActions';
import { validateName, validateNumber } from '../HelperFunctions/validation';
import history from '../history';
import { ContactContext } from './ContactContext';

const Contact = (props) => {
  const [contactDetails, setContactDetails] = useContext(ContactContext);
  const [contact, setContact] = useState({ name: '', number: '' });
  const [error, setError] = useReducer(errorReducer, initialErrorMessages);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (Object.keys(contactDetails).length > 0) {
      setContact({
        name: contactDetails.name,
        number: contactDetails.number
      })
      setEditMode(true)
    }
  }, [contactDetails]);

  const handleOnChange = (e) => {
    switch (e.target.id) {
      case 'name':
        setContact({ ...contact, name: e.target.value })
        validateName(e.target.value, setError)
        break;
      case 'number':
      default:
        setContact({ ...contact, number: e.target.value })
        validateNumber(e.target.value, setError)
    }
  }

  const handleClear = () => {
    setContact({ name: '', number: '' })
    validateAll({ name: '', number: '' })
  }

  const handleSubmit = () => {
    let { nameError, numberError } = error;
    let { name, number } = contact;
    validateAll(contact)
    if (name && !nameError && number && !numberError) {
      if (editMode) {
        let id = contactDetails.id;
        handleUpdateContact(contact, id)
          .then(res => {
            console.log('Contact Update Success')
            history.push('/')
          })
          .catch(error => {
            console.log('Error: ', error)
          })
      } else {
        handleAddContact(contact)
          .then(res => {
            console.log('Contact Added Success')
          })
          .catch(error => {
            console.log('Error: ', error)
          })
      }
      setContact({ name: '', number: '' })
    } else {
      console.log('In valid')
    }
  }

  const validateAll = (contact) => {
    let { name, number } = contact
    validateName(name, setError)
    validateNumber(number, setError)
  }

  return (
    <div className="add-contact">
      <Container style={{ padding: "20px", width: "40rem" }}>
        <Stack spacing={1.5}>
          <Center bg="#233D4D" h="50px" color="white">
            <span>{editMode ? 'Edit Contact' : 'Add Contact'}</span>
          </Center>
          <Input id='name' value={contact.name} variant="outline" placeholder="Name" onChange={handleOnChange} />
          <span className={`error-${error.nameError ? 'show' : 'hide'}`}>{error.nameError ? error.nameError : 'No Error'}</span>
          <Input id='number' value={contact.number} variant="outline" placeholder="Number" onChange={handleOnChange} />
          <span className={`error-${error.numberError ? 'show' : 'hide'}`}>{error.numberError ? error.numberError : 'No Error'}</span>
          <Stack spacing='auto' direction="row">
            <Button colorScheme="green" size="md" onClick={() => history.push('/')}>
              Back to Contacts
            </Button>
            <Button colorScheme="teal" variant="outline" size="md" onClick={handleClear}>
              Clear
            </Button>
            <Button alignSelf="flex-end" colorScheme="blue" size="md" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}

export default Contact
