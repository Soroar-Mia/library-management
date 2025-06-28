import { Schema, model, Model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

interface BookModel extends Model<IBook> {
    updateAvailability(id: string): Promise<void>;
}

const bookSchema = new Schema<IBook, BookModel>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        genre: {
            type: String,
            required: true,
            enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
        },
        isbn: { type: String, required: true, unique: true, trim: true },
        description: { type: String, trim: true, default: "" },
        copies: { type: Number, required: true, min: [0, "Copies must be a positive number"] },
        available: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


bookSchema.static("updateAvailability", async function (id: string) {
    const book = await this.findById(id);
    if (!book) throw new Error("Book not found");

    book.available = book.copies > 0;
    await book.save();
});


bookSchema.pre("save", function (next) {
    const book = this as IBook;
    book.available = book.copies > 0;
    next();
});

export const Book = model<IBook, BookModel>("Book", bookSchema);
