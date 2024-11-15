import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const ProductList=()=>{
    const [product, setProduct]=useState([]);


    const fetchData=async ()=>{

        let result =await fetch('http://localhost:5000/products-list');
        result=await result.json();
        setProduct(result);

    } 
    

    useEffect(()=>{
        
        fetchData();       

    },[]);


   const deleteProduct = async (id) => {
    try {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
        });        

        result = await result.json();

        if (result) {
            fetchData(); 
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Unable to delete the product. Please check your server connection or try again later.");
    }
};

const searchHandle= async (event)=>{
    let key=event.target.value;
    let result=await fetch(`http://localhost:5000/search/${key}`);
    result =await result.json();
    if(result){
        setProduct(result);
    }

}
    return(
       <div className='product-list'>
         <h3>Product List</h3>
         <input type='search' className='search-field' placeholder='Search Product' 
         onChange={searchHandle}
         />
          <ul>
              <li>S.No</li>
              <li>Name</li>
              <li>Price</li>
              <li>Category</li>
              <li>Product Company</li>
              <li>Operation</li>
          </ul>
          {
            product.map((item,index)=>

                <ul key={item._id}>
              <li>{index+1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`}>Update</Link>
              </li>
              
          </ul>

            )
          }
       </div>
    )
}

export default ProductList;