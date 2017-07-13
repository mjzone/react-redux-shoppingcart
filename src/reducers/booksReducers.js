"use strict";

export function booksReducers(state = {
  books: [{
      _id: 1,
      title: 'first book name',
      description: 'first book description',
      price: 43.33
    },
    {
      _id: 2,
      title: 'second book name',
      description: 'second book description',
      price: 56
    }
  ]
}, action) {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        books: [...state.books]
      }
    case "POST_BOOK":
      return {
        books: [...state.books, ...action.payload]
      }
    case "DELETE_BOOK":
      // create a copy of the current books
      var currentBooks = [...state.books];
      // determine at which index in books array is the book to be deleted
      const indexToDelete = currentBooks.findIndex(
        function (book) {
          return book._id == action.payload;
        }
      );
      // use slice to remove the book at the specified index
      return {
        books: [
          ...currentBooks.slice(0, indexToDelete),
          ...currentBooks.slice(indexToDelete + 1)
        ]
      }
    case "UPDATE_BOOK":
      var currentBooks = [...state.books];
      const indexToUpdate = currentBooks.findIndex(function (book) {
        return book._id === action.payload._id;
      });
      const updatedBook = {
        ...currentBooks[indexToUpdate],
        title: action.payload.title
      }
      return {
        books: [
          ...currentBooks.slice(0, indexToUpdate),
          updatedBook,
          ...currentBooks.slice(indexToUpdate + 1)
        ]
      }
  }
  return state;
}