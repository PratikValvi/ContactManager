import React, { useEffect, useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {
  Text, Stack, Grid, Alert, AlertIcon, AlertTitle, AlertDescription, Button, Box, Avatar
} from "@chakra-ui/react";
import EditIcon from '@material-ui/icons/Edit';
import SvgIcon from '@material-ui/core/SvgIcon';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import emptyBox from '../emptybox.jpg';
import { fetchData } from '../Actions/axiosActions';
import history from '../history';
import { ContactContext } from './ContactContext';
import { handleDeleteContact } from '../Actions/axiosActions';

const Contact = (props) => {
  const [contactDetails, setContactDetails] = useContext(ContactContext);
  const { id, name, number } = props.contactData

  const handleEdit = () => {
    setContactDetails(props.contactData)
    history.push('/contact')
  }

  const handleDelete = () => {
    handleDeleteContact(id)
      .then(() => {
        console.log('Delete Success')
        props.updateLocalState(id)
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
  }

  return (
    <Paper elevation={4} className="contact-wrapper" id={id} style={{ height: '60px', width: '220px' }}>
      <Stack direction="row" spacing={1.5} alignItems='center' p={1}>
        <div className="contact-details">
          <Stack direction="row">
            <Avatar name={`${name}`} src="https://bit.ly/broken-link" style={{ margin: '3px 0px 0px 3px' }} />
            <div>
              <Stack spacing="auto">
                <Text fontSize="18px" color="#070763" fontWeight="600">
                  {name}
                </Text>
                <Text fontSize="18px" color="#070763" fontWeight="600">
                  {number}
                </Text>
              </Stack>
            </div>
          </Stack>
        </div>
        <div className="button-group">
          <SvgIcon component={EditIcon} onClick={handleEdit} fontSize='medium' style={{ color: "#15e85b", cursor: "pointer" }} />
          <SvgIcon component={DeleteForeverIcon} onClick={handleDelete} fontSize='medium' style={{ color: "red", cursor: "pointer" }} />
        </div>
      </Stack>
    </Paper>
  )
}

const renderEmptyBox = () => {
  return (
    <div className="emptybox">
      <img
        src={emptyBox}
        alt='emptybox'
        width="500px"
        height="400px"
      />
      <div style={{ height: "15px" }}></div>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Contact List Empty!</AlertTitle>
        <AlertDescription>Click on Add Contact to add new contact in Contact List</AlertDescription>
      </Alert>
    </div>
  )
}

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchData()
      .then(res => {
        setContacts(res.data)
      })
      .catch(error => {
        console.log('Error: ', error)
      })
  }, []);

  const updateLocalState = (id) => {
    const newLocalState = [...contacts].filter((contact) => contact.id !== id)
    setContacts(newLocalState)
  }

  const renderContacts = () => {
    return contacts.length > 0 ? (
      <Grid templateColumns="repeat(3,1fr)" gap={4}>
        {
          contacts.map((contact) => <Contact key={contact.id} contactData={contact} updateLocalState={updateLocalState} />)
        }
      </Grid>
    ) : (
      renderEmptyBox()
    )
  }

  return (
    <div className="contact-list">
      <Container maxWidth="md" style={{ padding: "20px" }}>
        <Box bg="tomato" w="100%" p={4} color="white" marginBottom="5px">
          <Stack direction="row" spacing="auto">
            <Text fontSize="22px" color="white" fontWeight="600">
              Contact List
            </Text>
            <Button colorScheme="blue" onClick={() => history.push('/contact')}>Add Contact</Button>
          </Stack>
        </Box>
        <Container style={{ margin: '10px 0px 0px 23px' }}>
          {
            renderContacts()
          }
        </Container>
      </Container>
    </div>
  )
}

export default ContactList
