import './App.css';
import React from "react";
import {Component} from "react";
import bookRentService from "../../repository/bookRentRepository";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "../Header/header"
import Author from "../Authors/authors"
import Country from "../Countries/countries"
import Book from "../Books/BookList/books"
import BookAdd from "../Books/BookAdd/bookAdd"
import BookEdit from "../Books/BookEdit/bookEdit"

class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      authors: [],
      countries: [],
      categories: [],
      books:[],
      selectedBook: {}
    }
  }

  render() {
    return(
      <BrowserRouter>
        <Header/>
        <main>
          <div className={"container"}>
            <Routes>
              <Route path={"/authors"} exact element={<Author authors={this.state.authors} />}/>
              <Route path={"/countries"} exact element={<Country countries={this.state.countries}/>}/>
              <Route path={"/books/add"} exact element={<BookAdd authors={this.state.authors} categories={this.state.categories} onAdd={this.addBook}/>}/>
              <Route path={"/books/edit/:id"} exact element={<BookEdit authors={this.state.authors} categories={this.state.categories} book={this.state.selectedBook} onEditBook={this.editBook}/>}/>
              <Route path={"/books"} exact element={<Book books={this.state.books} onDelete={this.deleteBooks} onMark={this.markAsTaken} onEdit={this.getBook}/>}/>
              <Route path={"/"} exact element={<Book books={this.state.books} onDelete={this.deleteBooks} onMark={this.markAsTaken} onEdit={this.getBook}/>}/>
              <Route/>
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    );
  }

  loadAuthors=()=>{
    bookRentService.fetchAuthors().then((data)=>{
      this.setState({
        authors:data.data
      })
    })
  }

  loadCountries=()=>{
    bookRentService.fetchCountries().then((data)=>{
      this.setState({
        countries:data.data
      })
    })
  }

  loadBooks=()=>{
    bookRentService.fetchBooks().then((data)=>{
      this.setState({
        books:data.data
      })
    })
  }

  deleteBooks=(id)=>{
    bookRentService.deleteBooks(id).then(()=>{
      this.loadBooks();
    })
  }

  markAsTaken=(id)=>{
    bookRentService.markAsTaken(id).then(()=>{
      this.loadBooks();
    })
  }

  loadCategories=()=>{
    bookRentService.fetchCategories().then((data)=>{
      this.setState({
        categories:data.data
      })
    })
  }

  addBook=(name,category,author,availableCopies)=>{
    bookRentService.addBook(name,category,author,availableCopies).then(()=>{
      this.loadBooks();
    })
  }

  getBook=(id)=>{
    bookRentService.getBook(id).then((data)=>{
      this.setState({
        selectedBook:data.data
      })
    })
  }

  editBook=(id,name,category,author,availableCopies)=>{
    bookRentService.editBook(id,name,category,author,availableCopies).then(()=> {
      this.loadBooks();
    })
  }

  componentDidMount() {
    this.loadAuthors();
    this.loadCountries();
    this.loadBooks();
    this.loadCategories();
  }

}

export default App;
