const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./User");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/userDB';

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} - ${req.url}`);
    next();    
});

try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
} catch (err) {
    console.error("MongoDb Connection Error", err.message);
}


app.post('/api/users', async (req,res) => {
    try{
        const {name,age,address} = req.body;
        if(!name) return res.status(404).json({error: 'Name is required'});

        const savedUser = new User({name,address,age});
        await savedUser.save();

        if(savedUser) return res.status(201).json(savedUser);
    }catch (err){
        return res.status(500).json({error: err.message});
    }
});


app.get('/api/getUsers', async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error: error.message});        
    }
})

app.listen(PORT || 5000, () => console.log(`Server is Running on http://localhost:${PORT}`));