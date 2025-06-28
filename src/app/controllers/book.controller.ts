import express, { Request, Response } from "express"
import { Book } from "../models/book.model";



export const bookRoutes = express.Router()

bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error.errors || error.message || error
        });
    }
});


bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const filterGenre = req.query.filter as string | undefined;
        const sortBy = req.query.sortBy as string | undefined || "createdAt";
        const sortOrder = (req.query.sort as string | undefined)?.toLowerCase() === "desc" ? -1 : 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const filter: any = {};
        if (filterGenre) filter.genre = filterGenre;

        const books = await Book.find(filter)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message || "Server error", error });
    }
});


bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const book = await Book.findById(bookId)

    res.status(201).json({
        success: true,
        message: "Book get successfully",
        data: book
    })
})

bookRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const updatedBody = req.body
    const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true })

    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    })
})


bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId

    const book = await Book.findByIdAndDelete(bookId)

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: book
    })
})
