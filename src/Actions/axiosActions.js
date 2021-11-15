import axios from "axios";

export const fetchData = async () => {
  return await axios.get(`http://localhost:3000/contacts`)
}

export const handleAddContact = async (contact) => {
  return await axios.post(`http://localhost:3000/contacts`, contact)
}

export const handleUpdateContact = async (contact,id) => {
  return await axios.put(`http://localhost:3000/contacts/${id}`, contact)
}

export const handleDeleteContact = async (id) => {
  return await axios.delete(`http://localhost:3000/contacts/${id}`)
}