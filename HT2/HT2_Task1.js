class Library {
  #books;
  
  constructor(initialBooks = []) {
    if (new Set(initialBooks).size !== initialBooks.length) {
      throw new Error("Начальный список книг содержит дубликаты.");
    }
    this.#books = [...initialBooks];
  }
  
  get allBooks() {
    return [...this.#books];
  }
  
  addBook(title) {
    if (this.#books.includes(title)) {
      throw new Error(`Книга "${title}" уже есть в библиотеке.`);
    }
    this.#books.push(title);
  }
  
  removeBook(title) {
    const index = this.#books.indexOf(title);
    if (index === -1) {
      throw new Error(`Книга "${title}" не найдена в библиотеке.`);
    }
    this.#books.splice(index, 1);
  }
  
  hasBook(title) {
    return this.#books.includes(title);
  }
}


try {
  const myLibrary = new Library(["Война и мир", "Преступление и наказание", "Анна Каренина", "Отцы и дети", "Мёртвые души"]);
  console.log(myLibrary.allBooks); 
  
  myLibrary.addBook("Евгений Онегин");
  console.log(myLibrary.allBooks);
  
  console.log(myLibrary.hasBook("Преступление и наказание")); 
  
  myLibrary.removeBook("Преступление и наказание");
  console.log(myLibrary.allBooks);
  
  console.log(myLibrary.hasBook("Преступление и наказание")); 
} catch (error) {
  console.error(error.message);
}
