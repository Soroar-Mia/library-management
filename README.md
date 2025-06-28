## Library Management System <br>
A simple and scalable Library Management RESTful API built with Node.js, Express, TypeScript, and MongoDB (Mongoose). <br> 
This application allows you to manage books, borrow records, and retrieve summary reports. <br>
## Features <br>
## Books Management <br>

Create, Read, Update, Delete books <br>

Filter by genre, sort, and limit results <br>

## Borrow System <br>

Borrow books with due date and quantity <br>

Automatically updates availability and inventory <br>

## Borrowed Book Summary  <br>

Aggregated report showing how many times each book has been borrowed <br>

In the Library Management System, APIs are used to:

## API Endpoint	What it does  <br>
# GET /api/books	        Get a list of all books with filters and sorting  <br>
# POST /api/books       	Add a new book to the library    <br>
# GET /api/books/:id	    Get details of a single book by its ID  <br>
# PATCH /api/books/:id	  Update information about a book  <br>
# DELETE /api/books/:id	  Delete a book from the system  <br>
# POST /api/borrow      	Borrow a book (reduces available copies)  <br>
# GET /api/borrow	       Get a summary report of how many times each book was borrowed  <br>
