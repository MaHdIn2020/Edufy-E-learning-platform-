import express from 'express';
import dotenv from 'dotenv';
import {connectDb} from "./database/db.js";

dotenv.config();

const app = express();

// using middlewares
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Server is working");
});

// importing routes
import userRoutes from "./routes/user.js"

// using routes 
app.use("/api",  userRoutes)


const port =3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb()
});
