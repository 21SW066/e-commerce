import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom';

const UpdateProduct=()=>{
    const [name, setName]=useState("");
    const [price, setPrice]=useState("");
    const [category, setCategory]=useState("");
    const [company, setCompany]=useState("");
    const params=useParams();
    const navigate=useNavigate();


    useEffect(()=>{
        getProductData();
    },[])

    const getProductData=async ()=>{
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result =await result.json();
        
        if(result){
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
        }
    }

    const updateProduct= async()=>{
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
            },

            
            
        });
        
        result=await result.json();
        if(result){

        }
        navigate('/');

            

    }


    return(
        <div className='product'>
              <h1>Update Product</h1>
              <input className='inputBox' type='text' placeholder='Enter product name' value={name} onChange={(e)=>setName(e.target.value)}/>
        

              <input className='inputBox' type='text' placeholder='Enter price name' value={price} onChange={(e)=>setPrice(e.target.value)}/>
              

              <input className='inputBox' type='text' placeholder='Enter category name' value={category} onChange={(e)=>setCategory(e.target.value)}/>
              

              <input className='inputBox' type='text' placeholder='Enter product company' value={company} onChange={(e)=>setCompany(e.target.value)}/>
              

              <button className='app-btn' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;

