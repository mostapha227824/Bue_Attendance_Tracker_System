const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 50001;

// Load environment variables
dotenv.config();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// MongoDB Atlas connection string
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("Error connecting to MongoDB Atlas: ", err));

app.use('/', Routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
