import React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import logo from '../assets/images/logo.png'

 

const Nav=()=>{
    const auth =localStorage.getItem('user');
    const navigate=useNavigate();
    const logout=()=>{
           localStorage.clear();
           navigate('/signup');


    }
      return(
        <div>
            <img 
            alt='logo'
            className='logo'
            src={logo}/>
            { auth ?
            <ul className='nav-ul'>
                <li><Link to='/'>Product</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update/:id'>Update product</Link></li>
                <li><Link to='/profile'>Profile</Link></li>                
                <li><Link onClick={logout} to='/signup' >Logout ({JSON.parse(auth).name})</Link></li>           
                
            </ul>:
            <ul className='nav-ul nav-right'>
                 <>
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li><Link to='/signin'>Sign In</Link></li>
                    </>

            </ul>}
        </div>
    );

}

export default Nav;