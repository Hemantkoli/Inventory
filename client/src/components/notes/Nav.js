import React from 'react'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import NotHome from './NotHome'

var ls = require('local-storage');
ls.set("WarehouseName","All");

export default function Nav({setIsLogin}) {

    const history = useHistory();

    const logoutSubmit = () =>{
        localStorage.clear()
        setIsLogin(false)
    }

    const handleChange=(event)=>{
        //console.log(event.target.value);
        ls.set("WarehouseName",event.target.value);
        history.push('/NotHome');
    }

    const handleChangeToggle=(event)=>{
        if(document.body.style.backgroundColor == "crimson")
        {
            document.body.style.backgroundColor = "rgb(63,9,63)";
            document.getElementById('ToggleButton').style.background = "rgb(63,9,63)"; 
        }
        else
        {
            document.body.style.backgroundColor = "crimson";
            document.getElementById('ToggleButton').style.background = "crimson";
        }
    }

    return (
        <header>
            <div className="logo">
                <h1><Link to="/">Inventory</Link></h1>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>    
                    <select name="warehouses" id="warehouses" onChange={handleChange}>
                    <option value="All">All</option>
                    <option value="Sangli">Sangli</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bengalore">Bengalore</option>
                    <option value="Pune">Pune</option>
                    </select>
                </li>
                <li><Link to="/create">Add Product</Link></li>
                <li><button id='ToggleButton' onClick={handleChangeToggle} style={{background:"rgb(63,9,63)",color:"white",textTransform:"uppercase",border:"none",fontSize:"1rem"}}><Link to="/">Toggle</Link></button></li>
                <li onClick={logoutSubmit}><Link to="/">Logout</Link></li>
            </ul>
        </header>
    )
}
