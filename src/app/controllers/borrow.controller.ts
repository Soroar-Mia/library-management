import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();


borrowRoutes.post("/", async (req: Request, res: Response) => {

    try {
        const { book, quantity, dueDate } = req.body;

        const foundBook = await Book.findById(book)

        if (foundBook) {

            if (foundBook.copies < quantity) {
                res.status(400).json({
                    success: false,
                    message: "Not enough copies available",
                    error: null
                });
            } else {
                foundBook.copies -= quantity;
                foundBook.available = foundBook.copies > 0;
                await foundBook.save();

                const borrowRecord = await Borrow.create({
                    book,
                    quantity,
                    dueDate
                });

                res.status(201).json({
                    success: true,
                    message: "Book borrowed successfully",
                    data: borrowRecord
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "Book not found",
                error: null
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Borrow failed",
            error: error.message || error
        });
    }
});


borrowRoutes.get("/", async (_req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            { $unwind: "$bookDetails" },
            {
                $project: {
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrow summary",
            error: error.message || error
        });
    }
});
