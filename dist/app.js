"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const book_controller_1 = require("./app/controllers/book.controller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['https://library-management-frontend-blond.vercel.app']
}));
app.use(express_1.default.json());
app.use("/books", book_controller_1.bookRoutes);
app.use("/borrow", borrow_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Library Management System App');
});
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Not Found", error: null });
});
exports.default = app;
