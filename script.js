class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    changeStatus(){
        this.read = (this.read == true)? false : true;
    }
}

class Mylibrary{
    constructor(){
        this.books = [];
    }
    push(Newbook){
        this.books.push(Newbook);
    }
    pop(name){
        this.books = this.books.filter(bk => bk.name != name);
    }
    getBookByName(name){
        return this.books.find(bk => bk.name == name);
    }
    find(name){
        return this.books.some(bk => bk.name == name);
    }
    ChangeBookStatus(name){
        const index = this.books.findIndex(bk => bk.name == name);
        this.books[index].changeStatus();
    }
}

const Library = new Mylibrary();
let NumOfRows = 0;
const AddBookButton = document.querySelector('.add-book-btn');

AddBookButton.addEventListener('click', ()=>{
    ScreenController();
});


// for(let i=0; i<5;++i){
//     let newBook = new Book(`Book Number${i}`,"ali",200+i*33,true);
//     addBookToLibrary(newBook);
// }

function ScreenController(){

    const bookName = document.querySelector('#book-name');
    const authorName = document.querySelector('#author-name');
    const pagesNum = document.querySelector('#num-pages');
    const isRead = document.querySelector('[type="checkbox"]');
    const submitButton = document.querySelector('.submit-btn');
    const Table = document.querySelector('table');
    const SummitionForm = document.querySelector('form');
    const overLay = document.querySelector('.overlay');
    const Legend = document.querySelector('legend');

    SummitionForm.classList.add('focus');
    overLay.classList.add('focus-overlay');

    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); 

        if(Legend.classList.contains('error-msg')){
            Legend.classList.remove('error-msg');
            Legend.textContent = "Add another Book";
        }
        
        if(bookName.value === "" || authorName.value == "" || pagesNum.value == "") return;
        let newBook = new Book(bookName.value, authorName.value,pagesNum.value,isRead.checked);
            
        if(Library.find(newBook.name)){
            Legend.textContent = "Exists, Already";
            Legend.classList.add('error-msg');
            return;
        }

        SummitionForm.classList.remove('focus');
        overLay.classList.remove('focus-overlay');

        // bookName.value = "";
        // authorName.value = "";
        // pagesNum.value == "";
    
        addBookToLibrary(newBook);
    });

    function addBookToLibrary(newBook){
        createRowInTable(newBook);
        Library.push(newBook);
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
        BookName.textContent = row.name;
        AuthorName.textContent = row.author;
        pagesTd.textContent = row.pages;
    
        NewRow.appendChild(BookName);
        NewRow.appendChild(AuthorName);
        NewRow.appendChild(pagesTd);
        NewRow.appendChild(isReadTd);
        NewRow.appendChild(DeleteTd);
    
        Table.appendChild(NewRow);
    
        deleteIcon.addEventListener('click', () => {
            const confirmDeletion = confirm('Are you sure you want to delete this Book?');
            if(!confirmDeletion) {return;}
    
            ClearRow(deleteIcon.dataset.icon);
        });
    
        isReadButton.addEventListener('click', (e)=>{updateReadButton(e,isReadButton);});
        
    }

    overLay.addEventListener('click', ()=>{
        SummitionForm.classList.remove('focus');
        overLay.classList.remove('focus-overlay');
        Legend.classList.remove('error-msg');
        Legend.textContent = "Add another Book";
    });

    bookName.addEventListener('click', ()=>{
        Legend.classList.remove('error-msg');
        Legend.textContent = "Add another Book";
    });

    // the func remove The book from the Screen and also remove it from the array
    function ClearRow(value){
        const DeletedRow =  document.querySelector(`#row-${value}`);
        
        const RowFirstChild = DeletedRow.firstChild;
        Library.pop(RowFirstChild.textContent);
        
        DeletedRow.remove();
    }

    function updateReadButton(e, isReadButton) {

        let val = isReadButton.dataset.read;
        const BOOKNAME = document.querySelector(`#row-${val} :nth-child(1)`);
        Library.ChangeBookStatus(BOOKNAME.textContent);
        
        if(e.target.className == 'btn-read'){
            e.target.textContent = 'not read';
            e.target.classList.remove('btn-read');
            e.target.classList.add('btn-not-read');
        }
        else {
            e.target.textContent = 'read';
            e.target.classList.remove('btn-not-read');
            e.target.classList.add('btn-read');
        }
    }
}