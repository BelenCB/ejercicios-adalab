import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { getNotes } from "../services/api";

const HomePage = () => {
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    useEffect (() => {
        getNotes().then((data) => {
            setNotes(data);
        })
    }, []);

    const handleClick = () => {
        navigate("/add-note");
    };

    return (
        <>
            <h1>Mis notas</h1>
            <ul>
                {notes.map((note) => {
                    return (
                        <Link key={note.id} to={`/note/${note.id}`}>
                            <li>
                                <h2>{note.title}</h2>
                                <p>{note.content}</p>
                                {note.photo && <img src={note.photo}/>}
                            </li>
                        </Link>
                    )
                })}
            </ul>
            <button onClick={handleClick}>Añadir nota</button>
        </>
    )
};

export default HomePage;