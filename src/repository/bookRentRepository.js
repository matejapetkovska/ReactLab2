import axios from "../custom-axios/axios";

const bookRentService = {

    fetchAuthors:()=>{
        return axios.get("/authors");
    },
    fetchCountries:()=>{
        return axios.get("/countries");
    },
    fetchBooks:()=>{
        return axios.get("/books");
    },
    deleteBooks:(id)=>{
        return axios.delete(`/books/delete/${id}`)
    },
    markAsTaken:(id)=>{
        return axios.post(`/books/markastaken/${id}`)
    },
    fetchCategories:()=>{
        return axios.get("/books/categories")
    },
    addBook:(name,category,author,availableCopies)=>{
        return axios.post("/books/add",{
            "name":name,
            "category":category,
            "author":author,
            "availableCopies":availableCopies
        })
    },
    editBook:(id,name,category,author,availableCopies)=>{
        return axios.put(`/books/edit/${id}`,{
            "name":name,
            "category":category,
            "author":author,
            "availableCopies":availableCopies
        })
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    }
}

export default bookRentService;