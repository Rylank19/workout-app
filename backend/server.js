import express from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => {
    // connectDB();
    console.log("Server started at http://localhost:" + PORT)
});