import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
import { fetchContacts } from './operations';

// const contactsInitialState = {
//   data: [
//     { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
//     { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
//     { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
//     { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
//   ],
// };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // addContact: {
    //   reducer(state, action) {
    //     state.data.push(action.payload);
    //   },
    //   prepare(name, number) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         name: name,
    //         number: number,
    //       },
    //     };
    //   },
    // },
    deleteContact: {
      reducer(state, action) {
        const index = state.data.findIndex(
          contact => contact.id === action.payload
        );
        state.data.splice(index, 1);
      },
    },
  },
});

export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  contactsSlice.actions;
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
