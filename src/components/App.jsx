// import React, { useEffect, useState, useRef } from 'react';
import AddContactForm from './AddContactForm/AddContactForm';
// import { nanoid } from 'nanoid';
import { Title } from './Title/Title';
import { Contacts } from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { useDispatch } from 'react-redux';
// import { addContact, deleteContact } from 'redux/contactsSlice';
import { changeFilter } from 'redux/filterSlice';
import { getContacts, getFilter } from 'redux/selectors';
import { useSelector } from 'react-redux';
/* /// */
import { useEffect } from 'react';
import { fetchContacts, deleteContact, addContact } from 'redux/operations';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const checkContact = (arr, newName) => {
    return arr.some(({ name }) => {
      return newName.toLowerCase() === name.toLowerCase();
    });
  };

  const handleAddContact = ({ name, number }) => {
    const check = checkContact(contacts, name);
    if (check) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name: name, phone: number }));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = event => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <>
      <Title title={'Phonebook'} />
      <AddContactForm addContact={handleAddContact} />
      <Title title={'Contacts'} />
      <Filter value={filter} onChange={handleFilterChange} />
      <Contacts onDeleteContact={handleDeleteContact} />
    </>
  );
};

export default App;
