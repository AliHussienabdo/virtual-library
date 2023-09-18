class Book {
    constructor(book, author, pages, read) {
        this.book = book;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary(newBook){
    createRowInTable(newBook);
    Mylibrary.push(newBook);
}

const Mylibrary = [];

const bookName = document.querySelector('#book-name');
const authorName = document.querySelector('#author-name');
const pagesNum = document.querySelector('#num-pages');
const isRead = document.querySelector('[type="checkbox"]');
const submitButton = document.querySelector('.submit-btn');

const Table = document.querySelector('table');
const AddBookButton = document.querySelector('.add-book-btn');
const SummitionForm = document.querySelector('form');
const overLay = document.querySelector('.overlay');
const errorMsg = document.querySelector('.error-msg');

let NumOfRows = 0;



for(let i=0; i<5;++i){
    let newBook = new Book(`Book Number${i}`,"ali",200+i*33,true);
    addBookToLibrary(newBook);
}

function createRowInTable(row){

    const NewRow = document.createElement('tr');
    NewRow.setAttribute('id',`row-${++NumOfRows}`);

    const BookName = document.createElement('td');
    const AuthorName = document.createElement('td');
    const pagesTd = document.createElement('td');
    const isReadTd = document.createElement('td');
    const DeleteTd = document.createElement('td');

    let deleteIcon = document.createElement('img');
    deleteIcon.src = 'images/delete.png';
    deleteIcon.style.cssText = 'width: 20px; height: 20px;';
    deleteIcon.setAttribute('data-icon', `${NumOfRows}`);
    
    
    let isReadButton = document.createElement('button');
    isReadButton.setAttribute('data-read', `${NumOfRows}`);
    if(row.read){
        isReadButton.textContent = 'read';
        isReadButton.classList.add('btn-read');
    }
    else {
        isReadButton.textContent = 'not read';
        isReadButton.classList.add('btn-not-read');  
    }

    isReadTd.appendChild(isReadButton);
    
    DeleteTd.appendChild(deleteIcon);
    BookName.textContent = row.book;
    AuthorName.textContent = row.author;
    pagesTd.textContent = row.pages;

    NewRow.appendChild(BookName);
    NewRow.appendChild(AuthorName);
    NewRow.appendChild(pagesTd);
    NewRow.appendChild(isReadTd);
    NewRow.appendChild(DeleteTd);

    Table.appendChild(NewRow);

    deleteIcon.addEventListener('click', ()=>{
        const confirmDeletion = confirm('Are you sure you want to delete this Book?');
        if(!confirmDeletion) {return;}

        ClearRow(deleteIcon.dataset.icon);
    });

    isReadButton.addEventListener('click', (e)=>{updateReadButton(e,isReadButton);});
    
}

function updateReadButton(e, isReadButton) {

    let val = isReadButton.dataset.read;
    const ThisButtonFirstChild = document.querySelector(`#row-${val} :nth-child(1)`);
    const index = Mylibrary.findIndex(x => x.book == ThisButtonFirstChild.textContent);
    
    if(e.target.className == 'btn-read'){
        e.target.textContent = 'not read';
        e.target.classList.remove('btn-read');
        e.target.classList.add('btn-not-read');
        Mylibrary[index].read = false;
    }
    else {
        e.target.textContent = 'read';
        e.target.classList.remove('btn-not-read');
        e.target.classList.add('btn-read');
        Mylibrary[index].read = true;
    }
}

// the func remove The book from the Screen and also remove it from the array
function ClearRow(value){
    const DeletedRow =  document.querySelector(`#row-${value}`);
    
    const RowFirstChild = DeletedRow.firstChild;
    const index = Mylibrary.findIndex(x => x.book == RowFirstChild.textContent);
    Mylibrary.splice(index,1);
    
    DeletedRow.remove();
}


submitButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    if(bookName.value === "" || authorName.value == "" || pagesNum.value == "") return;
    let newBook = new Book(bookName.value, authorName.value,pagesNum.value,isRead.checked);
    
    const isExist = Mylibrary.find(x => x.book == newBook.book);

    if(isExist){
        errorMsg.classList.add('focus');
        return;
    }
    SummitionForm.classList.remove('focus');
    overLay.classList.remove('focus-overlay');

    // isRead.setAttribute('[data-check]', `${}`)
    addBookToLibrary(newBook);
});

AddBookButton.addEventListener('click', ()=>{
    SummitionForm.classList.add('focus');
    overLay.classList.add('focus-overlay');
    // Table.style.opacity = '.3';
});

overLay.addEventListener('click', ()=>{
    SummitionForm.classList.remove('focus');
    overLay.classList.remove('focus-overlay');
    errorMsg.classList.remove('focus');
});

bookName.addEventListener('click', ()=>{
    errorMsg.classList.remove('focus');
})