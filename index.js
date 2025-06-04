const { initializeDatabase } = require("./db/db.connect");
const Book = require("./models/books.model");
initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const express = require("express");
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

const createBookData = async (newBook) => {
  try {
    const book = new Book(newBook);
    const savedBook = await book.save();
    return savedBook;
  } catch (error) {
    console.log("Error creating book data:", error);
  }
};

app.post("/books", async (req, res) => {
  try {
    const book = await createBookData(req.body);
    if (book) {
      res
        .status(200)
        .json({ message: "Book created successfully.", book: book });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json("Failed to create new book data");
  }
});

const getAllBooks = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    console.log("Error getting books:", error);
  }
};

app.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    if (books) {
      res
        .status(200)
        .json({ message: "Books fetched successfully.", books: books });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get books." });
  }
});

const getBooksByTitle = async (titleName) => {
  try {
    const books = await Book.find({ title: titleName });
    return books;
  } catch (error) {
    console.log("Error getting books by title.");
  }
};

app.get("/books/title/:titleName", async (req, res) => {
  try {
    const books = await getBooksByTitle(req.params.titleName);
    if (books) {
      res
        .status(200)
        .json({ message: "Books fetched successfully by title", books: books });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books by title." });
  }
});

const getBooksByAuthor = async (authorName) => {
  try {
    const books = await Book.find({ author: authorName });
    return books;
  } catch (error) {
    console.log("Error getting books by author:", error);
  }
};

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const books = await getBooksByAuthor(req.params.authorName);
    if (books) {
      res.status(200).json({
        message: "Books successfully fetched by author name.",
        books: books,
      });
    } else {
      res.status(404).json({ error: "Books not found by the author name." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books by author." });
  }
});

const getBooksByGenre = async (bookGenre) => {
  try {
    const books = await Book.find({ genre: bookGenre });
    return books;
  } catch (error) {
    console.log("Error getting books by genre:", error);
  }
};

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const books = await getBooksByGenre(req.params.bookGenre);
    if (books) {
      res.status(200).json({
        message: "Books successfully fetched by genre.",
        books: books,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books by genre." });
  }
});

const getBooksByReleaseYear = async (bookReleaseYear) => {
  try {
    const books = await Book.find({ publishedYear: bookReleaseYear });
    return books;
  } catch (error) {
    console.log("Error getting books by release year:", error);
  }
};

app.get("/books/releaseYear/:bookReleaseYear", async (req, res) => {
  try {
    const books = await getBooksByReleaseYear(req.params.bookReleaseYear);
    if (books) {
      res.status(200).json({
        message: "Successfully fetched books by release year.",
        books: books,
      });
    } else {
      res.status(404).json({ error: "Books not found by release year." });
    }
  } catch (error) {
    res.status(500).json("Failed to fetch books by release year.");
  }
});

const updateBookRatingById = async (bookId, dataToUpdate) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate);
    return updatedBook;
  } catch (error) {
    console.log("Error updating book rating by Id:", error);
  }
};

app.post("/books/id/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateBookRatingById(
      req.params.bookId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedBook) {
      res.status(200).json({
        message: "Successfully updated the book rating by it's Id.",
        updatedBook: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book Rating by Id." });
  }
});

const updateBookRatingByTitle = async (bookTitle, dataToUpdate) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      {
        new: true,
      }
    );
    return updatedBook;
  } catch (error) {
    console.log("Error updating book rating by title:", error);
  }
};

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await updateBookRatingByTitle(
      req.params.bookTitle,
      req.body
    );
    if (updatedBook) {
      res.status(200).json({
        message: "Successfully updated the book rating by it's title.",
        updatedBook: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update rating by title." });
  }
});

const deleteBookById = async (bookId) => {
  try {
    const book = await Book.findByIdAndDelete(bookId);
    return book;
  } catch (error) {
    console.log("Error deleting book.");
  }
};

app.delete("/books/id/:bookId", async (req, res) => {
  try {
    const book = await deleteBookById(req.params.bookId);
    if (book) {
      res.status(200).json({
        message: "Book successfully deleted by Id.",
        deletedBook: book,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book by Id." });
  }
});

PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
