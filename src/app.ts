import express, { Request, Response } from "express";
import cors from "cors";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import { bookRoutes } from "./app/controllers/book.controller";

const app = express();

app.use(cors({
    origin: ['https://library-management-frontend-blond.vercel.app']
}));
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management System App');
});
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Not Found", error: null });
});

export default app;