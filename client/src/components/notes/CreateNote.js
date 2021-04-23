import React, {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function CreateNote() {
    const [note, setNote] = useState({
        title: '',
        content: '',
        from: '',
        location: '',
        qty: '',
        date: ''
    })
    const history = useHistory()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                const {title, content, from, location, qty, date} = note;
                const newNote = {
                    title, content, from, location, qty, date
                }

                await axios.post('/api/notes', newNote, {
                    headers: {Authorization: token}
                })
                
                return history.push('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }

    return (
        <div className="create-note">
            <h2>Product Details</h2>
            <form onSubmit={createNote} autoComplete="off">
                <div className="row">
                    <label htmlFor="title">Product Name</label>
                    <input type="text" value={note.title} id="title"
                    name="title" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Enter Product ID</label>
                    <input type="text" value={note.content} id="content"
                    name="content" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="from">From</label>
                    <input type="text" value={note.from} id="from"
                    name="from" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="location">Enter Location</label>
                    <input type="text" value={note.location} id="location"
                    name="location" required onChange={onChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="qty">Enter Quantity</label>
                    <input type="text" value={note.qty} id="qty"
                    name="qty" required onChange={onChangeInput} />
                </div>

                <label htmlFor="date">Date: {note.date} </label>
                <div className="row">
                    <input type="date" id="date"
                    name="date" onChange={onChangeInput} />
                </div>

                <button type="submit">Do it</button>
            </form>
        </div>
    )
}
