import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'
var ls = require('local-storage');


export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')
    let WarehouseName=ls.get("WarehouseName");
    const getNotes = async (token) =>{
        const res = await axios.get('api/notes', {
            headers:{Authorization: token}
        })
        
        if(WarehouseName=="All")
        {setNotes(res.data);}
        else
        {   
            var newArray = res.data.filter(function(el)
            {return el.location==WarehouseName;});
            setNotes(newArray);
        }
    }
    
    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) =>{
        try {
            if(token){
                await axios.delete(`api/notes/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    return (
        <div className="note-wrapper">
            {
                notes.map(note =>(
                    <div className="card" key={note._id}>
                        <h4 title={note.title}>{note.title}</h4>
                        <div className="text-wrapper">
                            <p>ID : {note.content}</p>
                            <p>FROM : {note.from}</p>
                            <p>CURRENT : {note.location}</p>
                            <p>QUANTITY : {note.qty}</p>
                        </div>
                        <p className="date">{note.date}</p>
                        <div className="card-footer">
                            {note.name}
                            <Link to={`edit/${note._id}`} >Transfer</Link>
                        </div>
                        <button className="close" 
                        onClick={() => deleteNote(note._id)} >X</button>
                    </div>
                ))
            }
            
        </div>
    )
}
