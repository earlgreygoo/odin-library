const main = document.querySelector(".main")
const btn = document.querySelector('.newBtn')
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");
const newBookForm = document.querySelector(".newBookForm");

/*Cheese Land by Gloria Snortle
Hamster Taxes by Barney Fizzgig
Moon People by Zaphod Beeblebrox
Penguin Dangers by Dr. Flibbertigibbet
Knit Underwear by Mildred Fluffypants
Spork Survival by Randy McSplodey
Cacti Friends by Prickly Pete
Ninja Steps by Sensei Splishy-Splash
Sock Mystery by Sherlock Gnomes
Dolphin Talk by Flipper McFlappy */



let library = [];
let id = 0;


btn.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});



function writeToMain(string){
	main.innerHTML = string;
}

function libraryCard(bookObj){
	let read = bookObj.read? "has finished" : "has yet to finish";
	let finishButton = bookObj.read? "":`<button class="completed" id="fin+${bookObj.id}">finished reading!</button>`;
	return `<div class="libraryCard">
				<h1 class="bookTitle">${bookObj.title}</h1>
				<p class="authorName">by ${bookObj.author}</p>
				<p class="page-num">pages: ${bookObj.pages}</p>
				<p class="finished">${read}</p>
				${finishButton}
				<button class="delete" id="${bookObj.id}">X</button>
			</div>
	`
}

function finishedBook(bookObj){
	bookObj.read? bookObj.read = false : bookObj.read = true;
	displayLibrary(library);
}

function displayLibrary(libraryArr){
	let output = "";

	for(let i = 0; i <= libraryArr.length -1; i++) {
		output += libraryCard(libraryArr[i]);
		
	}
	writeToMain(output);
	addDeleteListeners(libraryArr)
	addReadListener(libraryArr);
}


function addDeleteListeners(libraryArr){
	for(let i = 0; i <= libraryArr.length -1; i++) {
		let bookId = document.getElementById(`${libraryArr[i].id}`)
		bookId.addEventListener('click', () =>{
			console.log(libraryArr[i].id)
			removeFromLibrary(libraryArr[i]);
		});
	}
}
function addReadListener(libraryArr){
	for(let i = 0; i <= libraryArr.length -1; i++) {
		if (!libraryArr[i].read){
			let bookId = document.getElementById(`fin+${libraryArr[i].id}`);
			bookId.addEventListener('click',()=>{
				finishedBook(libraryArr[i]);
				})
		}
	}
}


function addToLibrary(bookObj){
	library.push(bookObj);
}

function removeFromLibrary(bookObj) {

	let bookId = document.getElementById(`${bookObj.id}`)
	for(let i = 0; i <= library.length -1; i++) {
		if(bookObj.id === library[i].id) {
			library.splice(i,1)
		}
	}
	displayLibrary(library)
}


function makeId() {
	id += 1;
	return id;
}





function book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = makeId();
	this.info = function() {
		if (this.read){
			return `${title}, by ${author}, ${pages} pages, has read`
		} else {
			return `${title}, by ${author}, ${pages} pages, not yet read`
		}
		
	}
}



newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let read = document.getElementById("read");

  const bookObj = new book(title.value,author.value,pages.value,read.checked);
  
  addToLibrary(bookObj);
  dialog.close();
  displayLibrary(library);
 

  
});







const cheeseLand = new book("Cheese Land","Gloria Snortle",154,false);
const HamsterTaxes = new book("Hamster Taxes","Barney Fizzgig",734,true);
const CactiFriends = new book("Cacti Friends","Peter Filpper",230,true);


addToLibrary(cheeseLand);
addToLibrary(HamsterTaxes);
addToLibrary(CactiFriends);


//writeToMain(libraryCard(HamsterTaxes));
displayLibrary(library);
console.table(library)