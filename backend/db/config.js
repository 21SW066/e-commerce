import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/e-commerce',{ ssl: false}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});
