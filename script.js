

//DATA STRUCTURE

let myLibrary = [];

function Book(title, author, genre, numOfPages, readStatus){

if(!new.target){
    throw new Error("You have to use the 'new' operator to create new object");
}

    this.title = title;
    this.author = author;
    this.genre = genre;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();

}

//Testy na dodanie nowej ksiazki

const book1 = new Book('Autorytarna polska', 'autorytet', 'history', 824, true );
const book2 = new Book('W oczach zemsty', 'Grzegorz Urban', 'drama', 246, false );
const book3 = new Book('Serotonina', 'Michel Houellebecq', 'crime', 366, true );

myLibrary.push(book1, book2, book3);

function renderLibrary() {

    gridForBookCards.innerHTML = ''; 

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCard.setAttribute('data-id', book.id);

        bookCard.innerHTML = `
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="genre">${book.genre}</div>
            <div class="numOfPages">${book.numOfPages} pages</div>
            <button class="readStatus ${book.readStatus ? 'read' : 'not-read'}" data-id="${book.id}">${book.readStatus ? 'Read' : 'Not Read yet'}</button>
            <button class="remove" data-id="${book.id}">Remove</button>
        `;

        gridForBooks.appendChild(bookCard);
    });
}




//USER UI 

const loginBtn = document.getElementById('loginbtn');
const registerBtn = document.getElementById('registerbtn');
const addNewBookBtn = document.getElementById('addBookbtn');
const gridForBookCards = document.getElementById('gridForBooks');
const addBookModal = document.getElementById('addBookModal');
const bookForm = document.getElementById('bookForm');
const isReadBtn = document.getElementById('isRead');
renderLibrary();
//bookcard buttons
const isReadBookCardBtn = document.querySelectorAll('.readStatus');
const removeBookCardBtn = document.querySelectorAll('.remove'); 



//otworzenie formularza wraz z animacja
addNewBookBtn.addEventListener('click', ()=> {
    addBookModal.classList.add('active');
    bookForm.classList.add('active');
}); 

// zamkniecie formularza po kliknieciu poza nim
addBookModal.addEventListener('click', (e) => {
    if (e.target === addBookModal) {
        addBookModal.classList.remove('active');
        bookForm.classList.remove('active');
    }
});

//przycisk is-read w formularzu

isReadBtn.addEventListener('click', function() {

    if(this.classList.contains("readQuestion")){
        this.classList.remove("readQuestion");
        this.classList.add("read");
        this.textContent = "I've read it";
    }
    else if(this.classList.contains("read")) {
        this.classList.remove("read");
        this.classList.add("not-read");
        this.textContent = "Not read it yet";
    }
    else if(this.classList.contains("not-read")) {
        this.classList.remove("not-read");
        this.classList.add("read");
        this.textContent = "I've read it";
    }

});
//przesykabue formularza i dodanie new book 

bookForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

 
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const numOfPages = document.getElementById('pages').value;
    const readStatus = isReadBtn.classList.contains("read");

    const newBook = new Book(title, author, genre, numOfPages, readStatus);
    myLibrary.push(newBook); 


    renderLibrary();

    addBookModal.classList.remove('active');
    bookForm.classList.remove('active');


    bookForm.reset();
});

//przycik is-read na bookcardzie i remove na bookcardzie, dynamiczna obsluga na kazdym bookcardzie

gridForBookCards.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove')) {
        const bookId = e.target.getAttribute('data-id');
        myLibrary = myLibrary.filter(b => b.id !== bookId);
        renderLibrary(); 
    }

    if (e.target.classList.contains('readStatus')) {
        const bookId = e.target.getAttribute('data-id');
        const book = myLibrary.find(b => b.id === bookId);

        if (book) {
            book.readStatus = !book.readStatus;
        }

        if (e.target.classList.contains("read")) {
            e.target.classList.remove("read");
            e.target.classList.add("not-read");
            e.target.textContent = "Not read yet";
        } else {
            e.target.classList.remove("not-read");
            e.target.classList.add("read");
            e.target.textContent = "Read";
        }
    }
});