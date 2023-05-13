import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledDeleteContactButton,
  StyledContactListItemLi,
  StyledContactsListUL,
} from './Contacts.styled';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';

const getFilteredContacts = (contacts, filter) => {
  return contacts.filter(({ name }) => {
    // console.log(contacts);
    return name.toLowerCase().includes(filter.toLowerCase());
  });
};

export const Contacts = ({ onDeleteContact }) => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    // console.log(contacts),
    <StyledContactsListUL>
      {filteredContacts.map(({ id, name, number }) => (
        <StyledContactListItemLi key={id}>
          <p>
            {name}: {number}
          </p>
          <StyledDeleteContactButton onClick={() => onDeleteContact(id)}>
            Delete
          </StyledDeleteContactButton>
        </StyledContactListItemLi>
      ))}
    </StyledContactsListUL>
  );
};

Contacts.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};
