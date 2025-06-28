import mongoose from "mongoose";
import app from "./app";

const PORT =  5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://miasoroar:mZOZicB5l06VYuDS@cluster0.j0knfwp.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

main();