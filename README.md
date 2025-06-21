# Library Management System API

A robust RESTful API for managing a library's book inventory and borrowing system. Built with Express.js, TypeScript, and MongoDB, and designed for easy deployment on Vercel.

## Features

-   **CRUD Operations for Books**: Create, Read, Update, and Delete books.
-   **Advanced Filtering & Sorting**: Fetch books with filters (by genre) and sorting (by any field).
-   **Book Borrowing System**: Business logic to handle borrowing, including stock management.
-   **Availability Control**: Automatically updates a book's availability status based on copy count.
-   **Aggregation Pipeline**: Provides a summary of all borrowed books, grouped by book.
-   **Robust Error Handling**: Centralized error handling for validation, not-found, and server errors.
-   **Ready for Deployment**: Includes configuration for seamless deployment to Vercel.

## Local Setup

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   [npm](https://www.npmjs.com/)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)<YourUsername>/Library-Management-API.git
    cd Library-Management-API
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=5000
    DATABASE_URL=<Your_MongoDB_Connection_String>
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

## API Endpoints

The base URL for all endpoints is `/api`.

| Feature              | Method | Endpoint              | Description                                        |
| -------------------- | ------ | --------------------- | -------------------------------------------------- |
| **Books** |        |                       |                                                    |
| Create Book          | `POST` | `/books`              | Adds a new book to the library.                    |
| Get All Books        | `GET`  | `/books`              | Retrieves all books with filtering and sorting.    |
| Get Single Book      | `GET`  | `/books/:bookId`      | Retrieves a book by its ID.                        |
| Update Book          | `PUT`  | `/books/:bookId`      | Updates a book's details.                          |
| Delete Book          | `DELETE`| `/books/:bookId`      | Deletes a book from the library.                   |
| **Borrowing** |        |                       |                                                    |
| Borrow a Book        | `POST` | `/borrow`             | Borrows a specified quantity of a book.            |
| Borrowed Summary     | `GET`  | `/borrow`             | Gets an aggregated summary of all borrowed books.  |

### Example Payloads & Responses

(You can copy-paste the detailed request/response structures from the assignment here for complete documentation).

## Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/).

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Add your `DATABASE_URL` as an environment variable in the Vercel project settings.
4.  Deploy!

**Live URL:** https://library-management-api-beige.vercel.app/

---
**Reminder for your submission:** Don't forget to create a short video explaining the key logic (especially the borrow functionality and aggregation pipeline) and the overall structure, and include the public link in your submission. Good luck!