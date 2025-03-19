const express = require('express')
const app = express();
const cors = require('cors');
const textroutes = require('./routes/textroutes');
require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.error(" MongoDB Connection Error:", err));

app.use(express.json());
app.use(cors({
    origin: '*',  
    methods: ['GET', 'POST'],  
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.use('/api/text',textroutes);


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
