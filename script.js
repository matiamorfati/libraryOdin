
let myLibrary = [];

function Book(tittle, author, genre, numOfPages, readStatus){

if(!new.target){
    throw new error("You have to use the 'new' operator to create new object");
}

    this.tittle = tittle;
    this.author = author;
    this.genre = genre;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();

}

function addBookToLibrary(tittle, author, genre, numOfPages, readStatus){

myLibrary.push(new Book(tittle, author, genre, numOfPages, readStatus));

}