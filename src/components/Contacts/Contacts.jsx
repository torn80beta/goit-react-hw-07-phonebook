import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledDeleteContactButton,
  StyledContactListItemLi,
  StyledContactsListUL,
} from './Contacts.styled';
import { useSelector } from 'react-redux';
import { getContacts, getFilter, getIsLoading } from 'redux/selectors';

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
  const isFetching = useSelector(getIsLoading);

  return (
    // console.log(contacts),
    <StyledContactsListUL>
      {filteredContacts.map(({ id, name, phone }) => (
        <StyledContactListItemLi key={id}>
          <p>
            {name}: {phone}
          </p>
          <StyledDeleteContactButton
            onClick={() => onDeleteContact(id)}
            disabled={isFetching}
          >
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
