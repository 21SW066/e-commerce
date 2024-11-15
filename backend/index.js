import express from 'express';
import cors from 'cors';
import "./db/config.js";
import User from './db/User.js';
import Product from './db/Product.js';

const app = express();

app.use(express.json());
app.use(cors());

//registration
app.post('/register', async (req, res) => {
    try {
        let user = new User(req.body);
        let result = await user.save();  
        result=result.toObject();
        delete result.password;

        res.send(result);   

    } catch (error) {
        res.status(500).send({ error: "Failed to register user" });  
    }
});

//login
app.post('/login',async (req, res)=>{
    if(req.body.email && req.body.password){

        let user= await User.findOne(req.body).select('-password');
    if(user){
        res.send(user);
    }else{
        res.send('No user found');
    }

    }else{
        alert("PLease fill all the field")
    }
    
});


//ADD PRODUCT
app.post('/add-product',async (req,res)=>{

    let product=new Product(req.body);
    let result=await product.save();
    res.send(result);

})

//Product List
app.get('/products-list',async (req,res)=>{
    const product=await Product.find();
    if(product.length>0){
        res.send(product);
    }
    else{
        res.send({result:"No Product found"})
    }
})


//Pruduct delete
app.delete('/product/:id',async (req,res)=>{
    let result=await Product.deleteOne({_id: req.params.id})
    res.send(result);
})

app.get('/product/:id',async (req,res)=>{
    let result =await Product.findOne({_id: req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({"result":'No Record Found'})
    }
})


//update product
app.put('/product/:id',async(req,res)=>{
    
    let result=await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body},
    )
    res.send(result);
})

//Search Product
app.get('/search/:key', async (req,res)=>{

    let result=await Product.find({
        "$or":[
        {
            name:{$regex: req.params.key}
        },
           {
            company:{$regex: req.params.key}
        },
           {
             category:{$regex: req.params.key}
        },
    ]});
    
    res.send(result);

})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
