"use strict";
import React from 'react';
import { Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBooks, deleteBook } from '../../actions/booksActions';


class BooksForm extends React.Component{
  handleSubmit() {
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value
    }];
    this.props.postBooks(book);
  }

  onDelete() {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBook(bookId);
  }

  render(){
    const booksList = this.props.books.map(function(book){
      return (
            <option key={book._id} value={book._id}>{book.title}</option>
      );
    });
    return(
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel> Title </ControlLabel>
            <FormControl type="text" placeholder="Enter Title" ref="title" />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel> Description </ControlLabel>
            <FormControl type="text" placeholder="Enter Description" ref="description" />
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel> Price </ControlLabel>
            <FormControl type="text" placeholder="Enter Price" ref="price" />
          </FormGroup>
          <Button onClick={this.handleSubmit.bind(this)} bsStyle="primary"> Save book </Button>
        </Panel>
        <Panel style={{marginTop: '25px'}}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Delete a book</ControlLabel>
            <FormControl ref="delete" componentClass="select" placeholder="select">
              <option value="select">select</option>
              {booksList}
            </FormControl>
          </FormGroup>
          <Button bsStyle="danger" onClick={this.onDelete.bind(this)}>Delete</Button>
        </Panel>
      </Well>

    );
  }
}
function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postBooks, deleteBook }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);